import { Form } from "@/components/Form";
import { useFormContext } from "react-hook-form";
import { signUpDefault, useSignupValidation } from "./signupValidation";
import { ErrorMessage } from "@hookform/error-message";
import { DevTool } from "@hookform/devtools";
import { tagData } from "../../../components/Form/TagButton/TagData";
import TagButton from "@/components/Form/TagButton";
import styles from "@/pages/signup/style/SignUpForm.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface SignUpType {
    profileImage: FileList; // 프로필
    username: string; // 아이디
    password: string; // 비밀번호
    confirmPassword: string; // 비밀번호 검사
    nickname: string; // 닉네임
    gender: string; // 성별
    age: number | undefined | null; // 나이
    tag: []; //태그
}
export function SignUpForm() {
    return (
        // 로그인 유효성 검사
        <Form
            validationSchema={useSignupValidation()}
            pageDefaultValues={signUpDefault}
        >
            <SignUpInput />
        </Form>
    );
}

function SignUpInput() {
    const navigate = useNavigate();
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useFormContext<SignUpType>();

    const onSubmit = async (data: SignUpType) => {
        const firstFile = data.profileImage?.[0];
        const updatedData = {
            ...data,
            profileImage: firstFile,
        };
        console.log(updatedData);
        try {
            const response = await axios.post(
                "http://54.180.121.206:8080/user",
                updatedData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("response", response);
            alert("회원가입이 완료되었습니다.");
            navigate("/login");
        } catch (error) {
            console.error("api error", error);
        }
    };

    return (
        <div>
            <form
                className={`${styles.container}`}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <Form.ImgInput name="profileImage" />
                    <ErrorMessage
                        errors={errors}
                        name="profileImage"
                        render={({ message }) => <p>{message}</p>}
                    />
                </div>
                <div>
                    <Form.Input<SignUpType>
                        name="username"
                        title="아이디"
                        placeholder="아이디를 입력해주세요."
                        type="text"
                        className={
                            errors.username
                                ? `${styles.input} ${styles.inputError}`
                                : styles.input
                        }
                    />
                    {/* <div>{formState.errors.username?.message}</div> */}
                    <ErrorMessage
                        errors={errors}
                        name="username"
                        render={({ message }) => <p>{message}</p>}
                    />
                </div>
                <div>
                    <Form.Input<SignUpType>
                        name="password"
                        title="비밀번호"
                        placeholder="비밀번호를 입력해주세요."
                        type="password"
                        className={
                            errors.password
                                ? `${styles.input} ${styles.inputError}`
                                : styles.input
                        }
                    />
                    <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({ message }) => <p>{message}</p>}
                    />
                </div>
                <div>
                    <Form.Input<SignUpType>
                        name="confirmPassword"
                        title="비밀번호 확인"
                        placeholder="비밀번호를 입력해주세요."
                        type="password"
                        className={
                            errors.confirmPassword
                                ? `${styles.input} ${styles.inputError}`
                                : styles.input
                        }
                    />
                    <ErrorMessage
                        errors={errors}
                        name="confirmPassword"
                        render={({ message }) => <p>{message}</p>}
                    />
                </div>
                <div>
                    <Form.Input<SignUpType>
                        name="nickname"
                        title="닉네임"
                        placeholder="닉네임을 입력해주세요."
                        type="text"
                        className={
                            errors.nickname
                                ? `${styles.input} ${styles.inputError}`
                                : styles.input
                        }
                    />
                    <ErrorMessage
                        errors={errors}
                        name="nickname"
                        render={({ message }) => <p>{message}</p>}
                    />
                </div>
                <div className={`${styles.genderWrap}`}>
                    <div>성별</div>
                    <div className={`${styles.genderBox}`}>
                        <Form.RadioButton
                            name="gender"
                            text="남성"
                            value="남성"
                        />
                        <Form.RadioButton
                            name="gender"
                            text="여성"
                            value="여성"
                        />
                        <Form.RadioButton
                            name="gender"
                            text="비공개"
                            value="비공개"
                        />
                    </div>
                    <ErrorMessage
                        errors={errors}
                        name="gender"
                        render={({ message }) => <p>{message}</p>}
                    />
                </div>
                <div>
                    <Form.Input<SignUpType>
                        name="age"
                        title="만 나이"
                        placeholder="나이를 입력해주세요."
                        type="number"
                        className={
                            errors.age
                                ? `${styles.input} ${styles.inputError}`
                                : styles.input
                        }
                    />
                    <ErrorMessage
                        errors={errors}
                        name="age"
                        render={({ message }) => <p>{message}</p>}
                    />
                </div>
                <div className={`${styles.tagWrap}`}>
                    {tagData.map((tags) => (
                        <TagButton
                            key={tags.id}
                            text={tags.name}
                            name="tag"
                            value={tags.id}
                        />
                    ))}
                    <ErrorMessage
                        errors={errors}
                        name="tag"
                        render={({ message }) => <p>{message}</p>}
                    />
                </div>
                <Form.Button text="확인" type="submit" variant="dark" />
            </form>
            <DevTool control={control} />
        </div>
    );
}
