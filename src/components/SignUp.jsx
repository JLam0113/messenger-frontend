import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data, e) => {
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: data.email,
                password: data.password,
            }),
        };
        await fetch('http://localhost:3000/signup', requestOptions)
        navigate(0);
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        {...register("email", {
                            required: true,
                            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                        })}
                    />
                    {errors.email && errors.email.type === "required" && (
                        <p className="errorMsg">Email is required.</p>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                        <p className="errorMsg">Email is not valid.</p>
                    )}
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        {...register("password", {
                            required: true,
                            minLength: 6
                        })}
                    />
                    {errors.password && errors.password.type === "required" && (
                        <p className="errorMsg">Password is required.</p>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                        <p className="errorMsg">
                            Password should be at-least 6 characters.
                        </p>
                    )}
                </div>
                <div className="form-control">
                    <label></label>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp
