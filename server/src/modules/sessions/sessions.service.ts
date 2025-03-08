import * as crypto from 'crypto';
import {BadRequestException, HttpException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from "@/modules/users/entities/user.entity";
import {Session} from "@/modules/sessions/entities/session.entity";
import {Repository} from "typeorm";

@Injectable()
export class SessionsService {
    constructor(
        @InjectRepository(Session)
        private sessionRepository: Repository<Session>,
    ) {
    }

    generateDeviceFingerprint(userAgent: string, ip: string): string {
        return crypto.createHash('sha256').update(userAgent + ip).digest('hex');
    }

    // Hàm kiểm tra số lượng thiết bị của người dùng
    async checkLimited(user: User, deviceFingerprint: string): Promise<boolean> {
        try {
            const MAX_DEVICE = +process.env.MAX_DEVICE
            const devicesAmount = await this.sessionRepository.find({
                where: {user: user}
            });

            const isNewDevice = !devicesAmount.some(session => session.device_fingerprint === deviceFingerprint);
            return !(devicesAmount.length >= MAX_DEVICE && isNewDevice); // true nếu có thể đăng nhập, false nếu không
        } catch (e) {
            console.log(`Lỗi đăng nhập: ${e.message}`);
            throw new InternalServerErrorException('Xảy ra lỗi từ phía server trong quá trình lưu dữ liệu phiên đăng nhập');
        }
    }

    // Hàm quản lý và thao tác với session login
    async handleSessionsWhenLogin(user: User, userAgent: string, ip: string) {
        const deviceFingerprint = this.generateDeviceFingerprint(userAgent, ip);

        const canLogin = await this.checkLimited(user, deviceFingerprint);
        if (!canLogin) {
            throw new BadRequestException('Số lượng thiết bị đã đạt giới hạn. Vui lòng đăng xuất khỏi tài khoản cũ.');
        }

        const existingSession = await this.sessionRepository.findOne({
            where: {device_fingerprint: deviceFingerprint},
        });

        if (existingSession) {
            existingSession.updated_at = new Date();
            await this.sessionRepository.save(existingSession);
            return existingSession;
        }

        await this.createNewSession(user, userAgent, ip, deviceFingerprint);
    }

    // Tạo phiên đăng nhập mới
    async createNewSession(user: User, userAgent: string, ip: string, deviceFingerprint: string) {
        // Kiểm tra số lượng thiết bị đã đăng nhập dựa trên user
        const activeSessions = await this.sessionRepository.count({
            where: {user: user}
        })

        // Kiểm tra nếu có nhiều hơn 2 phiên trên cùng 1 user thì xoá
        if (activeSessions >= 2) {
            await this.removeOldestSession(user);
            console.log('⚠Đã xóa phiên cũ để đăng nhập thiết bị mới');
        }

        // Tạo mới session
        const newSession = this.sessionRepository.create({
            user: user,
            user_agent: userAgent,
            device_ip: ip,
            device_fingerprint: deviceFingerprint,
            created_at: new Date(),
        })

        return this.sessionRepository.save(newSession);
    }

    async removeOldestSession(user: User) {
        const oldestSession = await this.sessionRepository.findOne({
            where: {user: user},
            order: {created_at: 'ASC'},
        });

        if (oldestSession) {
            await this.sessionRepository.remove(oldestSession);
        }
    }

    async deleteSession(user: User, userAgent: string, ip: string): Promise<{ affected: number; message: string }> {
        try {
            if (!user || !userAgent || !ip) {
                throw new InternalServerErrorException('Thông tin đăng xuất không hợp lệ')
            }

            const deleteSessionResult = await this.sessionRepository.delete({
                user: user,
                user_agent: userAgent,
                device_ip: ip,
            });

            if (deleteSessionResult.affected === 0) {
                return {affected: 0, message: 'Không có session nào được xoá'};
            }

            return {
                affected: deleteSessionResult.affected,
                message: 'Xoá session của người dùng thành công',
            };
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }

            throw new InternalServerErrorException('Đã xảy ra lỗi ở phía server trong quá trình đăng xuất');
        }
    }
}
