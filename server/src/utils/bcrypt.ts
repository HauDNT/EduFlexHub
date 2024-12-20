import * as bcrypt from 'bcrypt';

export const hashPassword = async (plainPassword: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(plainPassword, salt);

    return passwordHashed;
}