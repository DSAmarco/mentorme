import createError from "../utils/createError.js";
import Rate from "../models/rate.model.js";
import Gig from "../models/gig.model.js";
import User from "../models/user.model.js";

export const createRate = async (req, res, next) => {

    const newRate = new Rate({
        id: req.body.to,
        userId: req.userId,
        star: req.body.star,
    });

    try {
        const rate = await Rate.findOne({
            id: req.body.to,
            userId: req.userId,
        });

        if (rate)
            return next(
                createError(403, "You have already created a rate for this user!")
            );

        //TODO: check if the user purchased the gig.

        const savedRate = await newRate.save();

        await User.findByIdAndUpdate(req.body.to, {
            $inc: { totalStars: req.body.star, starNumber: 1 },
        });
        res.status(201).send(savedRate);
    } catch (err) {
        next(err);
    }
};

export const getRates = async (req, res, next) => {
    try {
        const rates = await Rate.find({ gigId: req.params.gigId });
        res.status(200).send(rates);
    } catch (err) {
        next(err);
    }
};
export const deleteRate = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};