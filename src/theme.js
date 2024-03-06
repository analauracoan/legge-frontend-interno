export const themeSettings = () => {
    return {
        palette: {
            primary: {
                main: '#025464',
                dark: '#024A58',
            },
            secondary: {
                main: '#E57C23',
            },
            neutral: {
                main: '#D9D9D9',
            },
            background: {
                default: "#E4E4E4",
            },
            black: {
                main: '#000000',
            },
            white: {
                main: '#FFFFFF',
            }
        },
        typography: {
            fontFamily: ["Plus Jakarta Sans", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Plus Jakarta Sans", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Plus Jakarta Sans", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Plus Jakarta Sans", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Plus Jakarta Sans", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Plus Jakarta Sans", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Plus Jakarta Sans", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};