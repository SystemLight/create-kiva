module.exports = [
    {
        url: '/api/oauth/login',
        type: 'post',
        response: (req, res) => {
            return {
                code: 20000,
                data: {
                    token: 'token'
                }
            };
        }
    },
    {
        url: '/api/users/me',
        type: 'get',
        response: (req, res) => {
            return {
                code: 20000,
                data: {
                    name: 'admin',
                    avatar: 'https://pic4.zhimg.com/v2-bd8ac878e4886e6e41c8accd0b10625f_is.jpg',
                    roles: ['admin']
                }
            };
        }
    }
];
