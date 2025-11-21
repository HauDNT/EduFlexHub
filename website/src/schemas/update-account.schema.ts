import z from 'zod';

export const UpdateAccountBody = z
  .object({
    username: z
      .string()
      .min(8, 'Tên đăng nhập phải có ít nhất 8 ký tự')
      .max(50, 'Tên đăng nhập phải có tối đa 50 ký tự'),
    email: z
      .string()
      .min(15, 'Email phải có ít nhất 15 ký tự')
      .max(100, 'Email phải có tối đa 100 ký tự'),
    password: z
      .string()
      .optional()
      .refine(
        (val) => !val || (val.length >= 8 && val.length <= 50),
        'Mật khẩu phải có từ 8 đến 50 ký tự nếu nhập'
      ),
    re_password: z.string().optional().refine(
        (val) => !val || (val.length >= 8 && val.length <= 50),
        'Mật khẩu nhập lại phải từ 8 đến 50 ký tự nếu nhập'
    ),
    fullname: z
      .string()
      .min(10, 'Họ và tên phải có ít nhất 10 ký tự')
      .max(255, 'Họ và tên phải có tối đa 255 ký tự'),
    gender: z.string().min(1, 'Bạn phải chọn giới tính').max(1, 'Bạn phải chọn giới tính'),
    role_id: z.string().min(1, 'Bạn phải chọn loại tài khoản').max(1, 'Bạn phải chọn loại tài khoản'),
    address: z
      .string()
      .min(10, 'Địa chỉ phải có ít nhất 10 ký tự')
      .max(255, 'Địa chỉ phải có tối đa 255 ký tự'),
    phone_number: z
      .string()
      .min(10, 'Số điện thoại phải có ít nhất 10 ký tự')
      .max(20, 'Số điện thoại phải có tối đa 20 ký tự'),
    avatar: z
      .instanceof(File, { message: 'Vui lòng chọn một file ảnh' })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: 'Ảnh phải nhỏ hơn 5MB',
      })
      .refine(
        (file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
        { message: 'Chỉ chấp nhận định dạng JPG, PNG hoặc GIF' }
      ).optional(),
  })
  .strict();

export type UpdateAccountBodyType = z.TypeOf<typeof UpdateAccountBody>;
