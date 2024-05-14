import { Input, Label, Button, HelperText } from "./widgets";
import { useForm, SubmitHandler } from "react-hook-form";
import { ApiService } from "@/services";
import { toast } from "react-toastify";
import { Icons } from "./icons";

type Inputs = {
  server: string;
  username: string;
  password: string;
};

const ServerDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: {
    server: string;
    username: string;
    password: string;
  }) => {
    console.log("server-details.component", "onSubmit", errors);
    const validated = await ApiService.validateCredentials(
      data.server,
      data.username,
      data.password
    );
    if (validated) {
      localStorage.setItem("server", JSON.stringify(data));
      window.location.reload();
    } else {
      toast.error("Invalid credentials");
    }
  };
  return (
    <div className="w-full">
      <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
        XTream Codes Details
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
        <input
          autoComplete="false"
          name="hidden"
          type="text"
          style={{ display: "none" }}
        />

        <Label>
          <span>Server address</span>
          <Input
            className="mt-1"
            type="text"
            placeholder="my.streams.com"
            autoComplete="off"
            {...register("server", {
              required: "Server is required",
            })}
            valid={!errors.server}
          />
          {errors.server && (
            <HelperText valid={false}>
              {errors.server.message as string}
            </HelperText>
          )}
        </Label>
        <Label className="mt-4">
          <span>Username</span>
          <Input
            className="mt-1"
            type="text"
            placeholder="username"
            autoComplete="off"
            data-lpignore="true"
            {...register("username", {
              required: "Username is required",
            })}
            valid={!errors.username}
          />
          {errors.username && (
            <HelperText valid={false}>
              {errors.username.message as string}
            </HelperText>
          )}{" "}
        </Label>
        <Label className="mt-4">
          <span>Password</span>
          <Input
            className="mt-1"
            type="password"
            autoComplete="off"
            data-lpignore="true"
            placeholder="***************"
            {...register("password", {
              required: "Password is required",
            })}
            valid={!errors.password}
          />
          {errors.password && (
            <HelperText valid={false}>
              {errors.password.message as string}
            </HelperText>
          )}
        </Label>

        <Button
          className="mt-4"
          block
          type="submit"
          aria-label="Submit"
          icon={Icons.rocket}
        >
          Let's go!
        </Button>
        <hr className="my-8" />
        <div className="text-xs text-gray-700">
          Your stream details are stored in your browser
        </div>
        <div className="text-xs text-gray-700">
          They are never stored on our servers
        </div>
        <div className="text-xs text-indigo-500">
          <a
            href="https://github.com/fergalmoran/xtreamium"
            target="_blank"
            rel="noreferrer"
          >
            Want proof?
          </a>
        </div>
      </form>
    </div>
  );
};

export default ServerDetails;
