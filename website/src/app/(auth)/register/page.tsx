import RegisterForm from "@/app/(auth)/register/register-form";
import imagePath from '../../../assets/images/login_bg.jpg';
import styles from './styles.module.css'

export default function RegisterPage() {
    return (
        <div
            style={{
                backgroundImage: `url(${imagePath.src})`,
                backgroundSize: 'cover'
            }}
            className={styles.pageContainer}>
            <RegisterForm />
        </div>
    )
}