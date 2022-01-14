import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import User from '../models/User';

class UserController {

    async create(req, res) {
        const schema = Yup.object().shape({
            tax_id: Yup.string().required("CPF não informado"),
            name: Yup.string().required("Nome não informado"),
            email: Yup.string().email().required("Email não informado ou inválido"),
        });
 
        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ success: false, error: err.errors });
        }

        try {
            const userEmail = await User.findOne({
                where: {
                    email: req.body.email
                }

            });

            if (userEmail) {
                return res
                    .status(400)
                    .json({ success: false, error: 'E-mail já cadastrado!' });
            }

            const userTaxId = await User.findOne({
                where: {
                    tax_id: req.body.tax_id
                }

            });

            if (userTaxId) {
                return res
                    .status(400)
                    .json({ success: false, error: 'CPF já cadastrado!' });
            }

            const newUser = await User.create({
                id: uuidv4(),
                ...req.body
            })

            const {
                tax_id,
                name,
                email,
                active,
            } = newUser;

            return res.json({
                success: true,
                message: 'Cadastro realizado com sucesso.',
                data: {
                    tax_id,
                    name,
                    email,
                    active,
                }
            });
        } catch (err) {

            console.log(err)
            if (err.response.data.mensagem) {
                return res
                    .status(400)
                    .json({ success: false, error: err.response.data.mensagem });
            }
            return res
                .status(400)
                .json({ error: 'Falha de comunicação, tente novamente em instantes.' });
        }
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email("Email precisa ser um email válido"),
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ success: false, error: err.errors });
        }

        try {
            const user = await User.findByPk(req.params.id);

            if (user) {
                if (req.body.email && req.body.email !== user.email) {
                    const emailExists = await User.findOne({
                        where: { email: req.body.email },
                    });

                    if (emailExists && !(req.params.id === emailExists.id)) {
                        return res
                            .status(400)
                            .json({ success: false, error: 'E-mail já cadastrado!' });
                    }
                }
            }

            const { id: newId } = await user.update(req.body);

            const newUser = await User.findByPk(newId)

            const {
                tax_id,
                name,
                email,
                active,
            } = newUser;

            return res.json({
                success: true,
                message: 'Cadastro atualizado com sucesso.',
                data: {
                    tax_id,
                    name,
                    email,
                    active,
                }
            });
        } catch (err) {

            console.log(err)
            if (err.response.data.mensagem) {
                return res
                    .status(400)
                    .json({ success: false, error: err.response.data.mensagem });
            }
            return res
                .status(400)
                .json({ error: 'Falha de comunicação, tente novamente em instantes.' });
        }
    }

    async show(req, res) {
        const { id } = req.params;

        const user = await User.findByPk(id)

        if (!user) {
            return res
                .status(400)
                .json({ success: false, error: 'Usuário não encontrado!' });
        }

        return res
            .status(200)
            .json({ success: true, user: user });
    }

    async index(req, res) {
        const users = await User.findAll()

        if (!users) {
            return res
                .status(400)
                .json({ success: false, error: 'Usuários não encontrados!' });
        }

        return res
            .status(200)
            .json({ success: true, users: users });
    }

    async destroy(req, res) {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res
                .status(400)
                .json({ success: false, error: 'Usuário não encontrado!' });
        }

        await user.destroy();

        return res
            .status(200)
            .json({ success: true, message: 'usuário excluido!' });
    }
}

export default new UserController();