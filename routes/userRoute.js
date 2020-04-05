const fs = require('fs')
const { join } = require('path')

const filePath = join(__dirname, 'users.json')

const getUsers = () => {
    const data = fs.existsSync(filePath) 
        ? fs.readFileSync(filePath) 
        : []

    try {
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

const userRoute = (app) => {
    app.route('/users/:id?')
        .get((req, res) => {
            const users = getUsers()
            res.status(200).send({ users })

        })
        .post((req, res) => {
            const users = getUsers()
            console.log(req.body)
            users.push(req.body)
            saveUser(users)
            res.status(201).send('OK')

        })
        .put((req, res) => {
            const users = getUsers()
            saveUser(users.map(user => {
                if (user.id === req.params.id) {
                    return {...user, ...req.body}
                }
                return user
            }))
        res.status(200).send('OK')
        })
        .delete( (req, res) => {
            const users = getUsers();
            saveUser(users.fiter(user => {
                user.id !== req.params.id
            }))
        })


    app.route('/info')
        .get((req,res)=>res.status(200).send('Applicatin running...'))
        .post((req, res) => {
            res.setHeader('Content-Type', 'application/json')
            res.write('Posted:\n')
            res.end(JSON.stringify(req.body, null, 2))
        })
}

module.exports = userRoute