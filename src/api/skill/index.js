import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { token } from "../../services/passport";
import { create, index, show, update, destroy } from "./controller";
import { schema } from "./model";
export Skill, { schema } from "./model";

const router = new Router();
const { skill, color } = schema.tree;

/**
 * @api {post} /skills Create skill
 * @apiName CreateSkill
 * @apiGroup Skill
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} skill Skill's name.
 * @apiParam {String} color Skill's color in HEX.
 * @apiSuccess {Object} skill Skill's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Skill not found.
 * @apiError 401 admin access only.
 */
router.post(
  "/",
  token({ required: true, roles: ["admin"] }),
  body({ skill, color }),
  create
);

/**
 * @api {get} /skills Retrieve skills
 * @apiName RetrieveSkills
 * @apiGroup Skill
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of skills.
 * @apiSuccess {Object[]} rows List of skills.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get("/", token({ required: true, roles: ["admin"] }), query(), index);

/**
 * @api {get} /skills/:id Retrieve skill
 * @apiName RetrieveSkill
 * @apiGroup Skill
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} skill Skill's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Skill not found.
 * @apiError 401 admin access only.
 */
router.get("/:id", token({ required: true, roles: ["admin"] }), show);

/**
 * @api {put} /skills/:id Update skill
 * @apiName UpdateSkill
 * @apiGroup Skill
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam skill Skill's skill.
 * @apiParam color Skill's color.
 * @apiSuccess {Object} skill Skill's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Skill not found.
 * @apiError 401 admin access only.
 */
router.put(
  "/:id",
  token({ required: true, roles: ["admin"] }),
  body({ skill, color }),
  update
);

/**
 * @api {delete} /skills/:id Delete skill
 * @apiName DeleteSkill
 * @apiGroup Skill
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Skill not found.
 * @apiError 401 admin access only.
 */
router.delete("/:id", token({ required: true, roles: ["admin"] }), destroy);

export default router;
