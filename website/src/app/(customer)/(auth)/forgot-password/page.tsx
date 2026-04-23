import imagePath from '../../../../assets/images/login_bg.jpg'
import styles from './styles.module.css'
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm"

export default function ForgotPasswordPage() {
    return (
        <div style={{
            backgroundImage: `url(${imagePath.src})`,
            backgroundSize: 'cover'
        }}
             className={styles.pageContainer}>
            <ForgotPasswordForm />
        </div>
    )
}