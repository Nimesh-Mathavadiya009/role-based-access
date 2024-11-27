export const registerFormControls = [
    {
        name: "userName",
        placeholder: "Enter Your userName",
        componentType: "input",
        type: "text",
        label: "UserName"
    },
    {
        name: "fullName",
        placeholder: "Enter Your fullName",
        componentType: "input",
        type: "text",
        label: "FullName"
    },
    {
        name: "email",
        placeholder: "Enter Your Email",
        componentType: "input",
        type: "email",
        label: "Email"
    },
    {
        name: "password",
        placeholder: "Enter Your password",
        componentType: "input",
        type: "password",
        label: "Password"
    },
    {
        name: "role",
        label: "Role",
        type: "radio",
        componentType: "radiobutton",
        options: [
            {id: "admin", label: "Admin"},
            {id: "user", label: "User"}
        ]
    }
]

export const loginFormControls = [
    {
        name: "email",
        placeholder: "Enter Your Email",
        componentType: "input",
        type: "email",
        label: "Email"
    },
    {
        name: "password",
        placeholder: "Enter Your password",
        componentType: "input",
        type: "password",
        label: "Password"
    }
]