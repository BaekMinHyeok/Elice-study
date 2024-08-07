import { useNavigate } from "react-router-dom";
import {
    SignUpFormType,
    signUpDefault,
    signupValidation,
} from "../utils/signupValidation";
import { Form } from "@/components/Form";
import { tagData } from "../../../components/Form/TagButton/TagData";
import Container from "@/components/Form/Container";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import postSignUp from "@/api/user/postSignUp";
import userQueryOption from "@/api/user";
import styles from "@/pages/signup/styles/SignUp.module.scss";

export function SignUp() {
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: postSignUp,
    });

    const onSubmit = (data: SignUpFormType) => {
        const { profileImage, username, nickname, ...jsonData } = data;
        const usernameCheck = userQueryOption.getDuplicationEmail({
            username,
        });
        if (usernameCheck) {
            toast.error("중복된 이메일입니다.");
            return;
        }
        const nicknameCheck = userQueryOption.getDuplicationNickName({
            nickname,
        });
        if (nicknameCheck) {
            toast.error("중복된 닉네임입니다.");
            return;
        }
        const formData = new FormData();
        const userJoinPayload = {
            username,
            nickname,
            ...jsonData,
            userRoleList: [1], // 백엔드에서 추가 요구하신 필드 값
        };
        // 회원가입 데이터
        formData.append(
            "userJoinPayload",
            new Blob([JSON.stringify(userJoinPayload)], {
                type: "application/json",
            })
        );
        formData.append("imgFile", profileImage || "");

        mutate(formData, {
            onSuccess: () => {
                toast.success("회원가입이 완료되었습니다.", {
                    autoClose: 2000,
                });
                navigate("/login");
            },
            onError: () => {
                toast.error("회원가입에 실패하였습니다.", { autoClose: 2000 });
            },
        });
    };

    return (
        <Form
            validationSchema={signupValidation}
            pageDefaultValues={signUpDefault}
            onSubmit={onSubmit}
        >
            <Form.ImgInput name="profileImage" />
            <Form.Input
                name="username"
                title="이메일"
                placeholder="이메일을 입력해주세요."
            />

            <Form.Input
                name="password"
                title="비밀번호"
                placeholder="비밀번호를 입력해주세요."
                type="password"
            />

            <Form.Input
                name="confirmPassword"
                title="비밀번호 확인"
                placeholder="비밀번호를 입력해주세요."
                type="password"
            />

            <Form.Input
                name="nickname"
                title="닉네임"
                placeholder="닉네임을 입력해주세요."
            />

            <Container title="성별" name="gender">
                <div className={`${styles.genderBox}`}>
                    <Form.RadioButton name="gender" text="남성" value="MALE" />
                    <Form.RadioButton
                        name="gender"
                        text="여성"
                        value="FEMALE"
                    />
                    <Form.RadioButton
                        name="gender"
                        text="비공개"
                        value="SECRET"
                    />
                </div>
            </Container>

            <Form.Input
                name="age"
                title="만 나이"
                placeholder="나이를 입력해주세요."
                type="number"
            />
            <Container title="건강 고민" name="userHashtagList">
                <div className={`${styles.tagWrap}`}>
                    {tagData.map((tags) => (
                        <Form.TagButton
                            key={tags.id}
                            text={tags.name}
                            name="userHashtagList"
                            value={tags.id}
                        />
                    ))}
                </div>
            </Container>
            <Form.Button text="확인" type="submit" variant="dark" />
        </Form>
    );
}
