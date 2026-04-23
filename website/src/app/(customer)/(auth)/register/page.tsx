import RegisterForm from "@/components/forms/RegisterForm";
import imagePath from '../../../../assets/images/login_bg.jpg';

export default function RegisterPage() {
    return (
        <div
            style={{
                backgroundImage: `url(${imagePath.src})`,
                backgroundSize: 'cover'
            }}
            className="flex justify-center items-center h-screen bg-cover bg-center">
            <RegisterForm />
        </div>
    )
}