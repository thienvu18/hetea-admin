import { success, notFound } from "../../services/response/";
import { Contract } from "../contract";

export const revenue = ({ query }, res, next) => {
  const unit = query.unit;
  const startDate = Date.parse(query.startDate);
  const endDate = Date.parse(query.endDate);

  let group = {};
  switch (unit) {
    case "day":
      group = { $dayOfYear: "$paidDate" };
      break;
    case "week":
      group = { $week: "$paidDate" };
      break;
    case "month":
      group = { $month: "$paidDate" };
      break;
    case "year":
      group = { $year: "$paidDate" };
      break;

    default:
      break;
  }

  Contract.aggregate([
    {
      $match: {
        $and: [
          { status: "done" },
          {
            paidDate: {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
            }
          }
        ]
      }
    },
    {
      $project: {
        price: 1,
        paidDate: 1
      }
    },
    {
      $group: {
        _id: group,
        value: { $sum: "$price" }
      }
    }
  ])
    .exec()
    .then(data => {
      if (data && data.length != 0) {
        return data.map(record => {
          return {
            id: record._id,
            value: (record.value * 5) / 100
          };
        });
      }
      return [];
    })
    .then(success(res));
};

export const topTutorRevenue = ({ query }, res, next) => {
  const startDate = Date.parse(query.startDate);
  const endDate = Date.parse(query.endDate);

  Contract.aggregate([
    {
      $match: {
        $and: [
          { status: "done" },
          {
            paidDate: {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
            }
          }
        ]
      }
    },
    {
      $project: {
        price: 1,
        paidDate: 1,
        tutor: 1
      }
    },
    {
      $group: {
        _id: "$tutor",
        value: { $sum: "$price" }
      }
    },
    {
      $sort: {
        value: 1
      }
    }
  ])
    .limit(10)
    .exec()
    .then(data => {
      if (data && data.length != 0) {
        return data.map(record => {
          return {
            id: record._id,
            value: record.value
          };
        });
      }
      return [];
    })
    .then(success(res));
};
