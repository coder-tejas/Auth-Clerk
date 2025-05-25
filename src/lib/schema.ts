import { z } from "zod";
import { string } from "zod/v4";


const phoneRegex = /^[6-9]\d{9}$/; // Indian phone format, tweak if needed

//* LOG IN SCHEMA GOES HERE---------------------------------------------------------------

export const loginSchema = z
.object({
    method: z.enum(["email", "phone"]),
    email: z.string().email().optional(),
    phone: z.string().regex(phoneRegex, "Invalid phone number").optional(),
})
.refine(
    (data) => {
      if (data.method === "email") return !!data.email;
      if (data.method === "phone") return !!data.phone;
      return false;
    },
    {
        message: "Please enter a valid email or phone based on selected method.",
      path: ["email"], // this targets where the error shows up
    }
  );
  export type LoginFormData = z.infer<typeof loginSchema>;

//& ENDS HERE--------------------------------------------------------------------------------
//* SIGN UP SCHEMA GOES HERE---------------------------------------------------------------

export const SignUpSchema = z.object({
  name: z
    .string({ required_error: "Please fill in this field." })
    .min(1, { message: "Please fill in this field." }),
  email:z
    .string({ required_error: "Please fill in this field." })
    .email({
      message: "Please enter a valid email address (Ex: johndoe@domain.com).",
    }),
  phoneNumber:z
    .string()
    .min(10, { message: 'Must be a valid mobile number' })
    .max(14, { message: 'Must be a valid mobile number' })
    .regex(phoneRegex, 'Invalid Number!'),
  role:z
    .enum(["Manager","Tenant"] ),
});

export type SignUpFormData = z.infer<typeof SignUpSchema>

//& ENDS HERE--------------------------------------------------------------------------------