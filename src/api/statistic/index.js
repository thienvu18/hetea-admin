import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { password, master, token } from "../../services/passport";
import { revenue, topTutorRevenue } from "./controller";

const router = new Router();

/**
 * @api {get} /statistics/revenue Retrieve revenue
 * @apiName RetrieveRevenue
 * @apiGroup Statistic
 * @apiPermission admin
 * @apiParam {String} access_token Admin access_token.
 * @apiParam {Date} startDate Start date.
 * @apiParam {Date} endDate End date.
 * @apiParam {String=day,week,month,year} [unit=day] Unit.
 * @apiSuccess {Object[]} data Revenue per unit.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get("/revenue", token({ required: true, roles: ["admin"] }), revenue);

/**
 * @api {get} /statistics/toptutorrevenue Retrieve top tutor's revenue
 * @apiName RetrieveTopTutorRevenue
 * @apiGroup Statistic
 * @apiPermission admin
 * @apiParam {String} access_token Admin access_token.
 * @apiParam {Date} startDate Start date.
 * @apiParam {Date} endDate End date.
 * @apiParam {String=day,week,month,year} [unit=day] Unit.
 * @apiSuccess {Object[]} data Revenue per unit.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get(
  "/toptutorrevenue",
  token({ required: true, roles: ["admin"] }),
  topTutorRevenue
);

export default router;
