import * as crypto from 'crypto';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from "@/modules/users/entities/user.entity";
import {Session} from "@/modules/sessions/entities/session.entity";
import {Repository} from "typeorm";

@Injectable()
export class SessionsService {
    constructor(
        @InjectRepository(Session)
        private sessionRepository: Repository<Session>,
    ) { }

    generateDeviceFingerprint(userAgent: string, ip: string): string {
        return crypto.createHash('sha256').update(userAgent + ip).digest('hex');
    }

    async handleSessionsWhenLogin(user: User, userAgent: string, ip: string) {
        // Tạo mã device finger print (hash 256)
        const deviceFingerprint = this.generateDeviceFingerprint(userAgent, ip)

        // Kiểm tra xem đã tồn tại session này chưa?
        const existingSession = await this.sessionRepository.findOne({
            where: { device_fingerprint: deviceFingerprint },
        });

        if (existingSession) {
            // Cập nhật session hiện tại thay vì tạo mới
            existingSession.updated_at = new Date();
            await this.sessionRepository.save(existingSession);
            return existingSession;
        }

        // Nếu không có tồn tại thì tiến hành tạo phiên mới
        await this.createNewSession(user, userAgent, ip, deviceFingerprint);
    }

    // Tạo phiên đăng nhập mới
    async createNewSession(user: User, userAgent: string, ip: string, deviceFingerprint: string) {
        // Kiểm tra số lượng thiết bị đã đăng nhập dựa trên user
        const activeSessions = await this.sessionRepository.count({
            where: { user: user }
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
            where: { user: user },
            order: { created_at: 'ASC' },
        });

        if (oldestSession) {
            await this.sessionRepository.remove(oldestSession);
        }
    }
}
