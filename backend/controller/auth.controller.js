export const SignUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Email and Password is required",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};
