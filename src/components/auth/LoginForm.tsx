import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { Modal, Button, message } from "antd";

type LoginFormData = {
  login: string;
  hashed_password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>();
  const { loginMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] =
    useState(false);
  const [isAdminInfoModalOpen, setAdminInfoModalOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const login = watch("login", "");
  const hashed_password = watch("hashed_password", "");
  const isFormFilled = login.trim() !== "" || hashed_password.trim() !== "";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBlocked) {
      setIsBlockedModalOpen(true);
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsBlocked(false);
            setAttempts(0);
            setTimeLeft(30);
            setIsBlockedModalOpen(false);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBlocked]);

  const onSubmit = (data: LoginFormData) => {
    if (isBlocked) return;

    loginMutation.mutate(data, {
      onError: () => {
        setAttempts((prev) => {
          if (prev + 1 >= 3) {
            setIsBlocked(true);
            message.error("Ko'p urinishlar! 30 soniya kuting.");
            return 3;
          }
          message.error("Login yoki parol noto'g'ri");
          return prev + 1;
        });
      },
      onSuccess: () => {
        setAttempts(0);
      },
    });
  };

  return (
    <div className="login-form">
      <img className="auth-logo" src="/imgs/LOGO.svg" alt="Logo" />
      <h2>Saytga kirish</h2>
      <p>Iltimos, tizimga kirish uchun login va parolingizni kiriting.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Login</label>
          <div className="input-wrapper">
            <img className="input-icon" src="/icons/Login-icon.svg" alt="" />
            <input
              type="text"
              {...register("login", { required: "Login majburiy" })}
              placeholder="Loginni kiriting"
              className={errors.login ? "input-error" : ""}
            />
          </div>
          {errors.login && (
            <p className="error-message">{errors.login.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Parol</label>
          <div className="password-wrapper">
            <img
              className="input-icon"
              src="/icons/carbon-password.svg"
              alt=""
            />
            <input
              type={showPassword ? "text" : "password"}
              {...register("hashed_password", { required: "Parol majburiy" })}
              placeholder="Parolni kiriting"
              className={errors.hashed_password ? "input-error" : ""}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.hashed_password && (
            <p className="error-message">{errors.hashed_password.message}</p>
          )}
        </div>

        <div className="login-info">
          <p>Urinishlar soni: {attempts}/3</p>
          <button
            type="button"
            className="forgot-password"
            onClick={() => setForgotPasswordModalOpen(true)}
          >
            Parolingizni unutdingizmi?
          </button>
        </div>

        <button
          type="submit"
          className={`login-button ${
            !isFormFilled || isBlocked ? "disabled" : ""
          }`}
          disabled={!isFormFilled || isBlocked || loginMutation.isPending}
        >
          {isBlocked
            ? `Qayta urinish: ${timeLeft} s`
            : loginMutation.isPending
            ? "Yuklanmoqda..."
            : "Kirish"}
        </button>
      </form>

      <p className="auth-switch">
        Hisobingiz yo'q bo'lsa, tizimga kirish huquqini olish uchun
        <button
          className="admin-link"
          onClick={() => setAdminInfoModalOpen(true)}
        >
          do'kon administratori
        </button>
        bilan bog'laning.
      </p>

      <Modal
        title="Parolni tiklash"
        open={isForgotPasswordModalOpen}
        onCancel={() => setForgotPasswordModalOpen(false)}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => setForgotPasswordModalOpen(false)}
          >
            Tushunarli
          </Button>,
        ]}
      >
        <p>
          Iltimos, parolingizni tiklash uchun do'kon administratori bilan
          bog'laning.
        </p>
      </Modal>

      <Modal
        title="Do'kon administratori"
        open={isAdminInfoModalOpen}
        onCancel={() => setAdminInfoModalOpen(false)}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => setAdminInfoModalOpen(false)}
          >
            Tushunarli
          </Button>,
        ]}
      >
        <p>Hozircha do'kon administratori mavjud emas.</p>
      </Modal>

      <Modal
        title="Juda ko'p noaniq urinish"
        open={isBlockedModalOpen}
        footer={null}
        closable={false}
      >
        <p>Iltimos, {timeLeft} soniya kuting va qayta urinib ko'ring.</p>
      </Modal>
    </div>
  );
};

export default LoginForm;
