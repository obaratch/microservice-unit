import type { Context } from "hono";
import { Hono } from "hono";
import { DataTypes, Sequelize } from "sequelize";
import logger from "../utils/logger.js";

const router = new Hono();
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "sqlite/db.sqlite",
});

const User = sequelize.define(
	"User",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{},
);

(async function init() {
	await sequelize.sync();

	const admin = (
		await User.findOrCreate({
			where: { name: "admin" },
			defaults: { name: "admin" },
		})
	)[0].toJSON();
	logger.debug({ admin });
})();

const getUsers = async (c: Context) => {
	const users = (await User.findAll()).map((user) => user.toJSON());
	return c.json(users);
};

router.get("", getUsers);
router.get("/", getUsers);

export default router;
