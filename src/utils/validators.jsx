import Joi from "joi"

const registerSchema = Joi.object({
    email: Joi
    .string()
    .email({ tlds: false})
    .required()
    .messages({
        "string.empty": "Email is required"
    }),
    firstName: Joi
    .string()
    .required()
    .messages({
        "string.empty": "Firstname is required"
    }),
    lastName: Joi
    .string()
    .required()
    .messages({
        "string.empty": "Lastname is required"
    }),
    password: Joi
    .string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({
        "string.empty": "Password is required!!!",
        "string.pattern.base": "Password must contain a-z A-Z 0-9 and must be at least 6 characters.!!!"
    }),
    confirmPassword: Joi
    .string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
        "string.empty": "Confirm Password is required!!!",
        "any.only": "Password and Confirm Password is not match!!!"
    })
})

// const loginSchema = Joi.object({
//     email: Joi.string().required().trim().email({tlds: false}),
//     password: Joi.string().required()
// })

const validateRegister = (input) => {
    // console.log(input)
    const { error } = registerSchema.validate(input, {
        abortEarly: false,
    })
    // ถ้ามี error
    // console.log(error.details)
    if(error) {
        const formatError = error.details.reduce((prev, curr) => {
            // code
            // console.log(curr.path[0])
            // console.log(curr.message)
            prev[curr.path[0]] = curr.message
            return prev
        }, {})

        return formatError
    }
    return null
}

export default validateRegister