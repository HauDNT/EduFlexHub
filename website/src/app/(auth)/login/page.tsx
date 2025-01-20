import LoginForm from "@/app/(auth)/login/login-form"
import imagePath from '../../../assets/images/login_bg.jpg';
import styles from './styles.module.css'

export default function LoginPage() {
    return (
        <div style={{
            backgroundImage: `url(${imagePath.src})`,
            backgroundSize: 'cover'
        }}
             className={styles.pageContainer}>
            <LoginForm />
        </div>
    )
}
