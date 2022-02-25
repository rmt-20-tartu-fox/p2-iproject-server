const axios = require("axios").default;
const BOOKING_API = process.env.BOOKING_API;

class BookingAPI {
  static async getHotel(req, res, next) {
    try {
      let { longitude, latitude, checkin, checkout } = req.body;

      if (!longitude) longitude = "107.6191";
      if (!latitude) latitude = "6.9175";

      let options = {
        method: "GET",
        url: "https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates",
        params: {
          checkin_date: checkin,
          order_by: "popularity",
          units: "metric",
          longitude: longitude,
          adults_number: "2",
          latitude: latitude,
          room_number: "1",
          locale: "en-gb",
          filter_by_currency: "IDR",
          checkout_date: checkout,
          children_number: "2",
          children_ages: "5,0",
          page_number: "0",
          categories_filter_ids: "class::2,class::4,free_cancellation::1",
          include_adjacency: "true",
        },
        headers: {
          "x-rapidapi-host": "booking-com.p.rapidapi.com",
          "x-rapidapi-key": BOOKING_API,
        },
      };

      const { data } = await axios.request(options);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async roomDetailHotel(req, res, next) {
    try {
      const { hotel_id } = req.body;

      let options = {
        method: "GET",
        url: "https://booking-com.p.rapidapi.com/v1/hotels/room-list",
        params: {
          currency: "IDR",
          adults_number_by_rooms: "2,1",
          checkin_date: "2022-08-05",
          hotel_id,
          units: "metric",
          checkout_date: "2022-08-06",
          locale: "id",
          children_number_by_rooms: "2,1",
          children_ages: "5,0,9",
        },
        headers: {
          "x-rapidapi-host": "booking-com.p.rapidapi.com",
          "x-rapidapi-key": BOOKING_API,
        },
      };

      const { data } = await axios.request(options);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async searchLocation(req, res, next) {
    try {
      const { search } = req.query;

      var options = {
        method: "GET",
        url: "https://booking-com.p.rapidapi.com/v1/hotels/locations",
        params: { locale: "id", name: search },
        headers: {
          "x-rapidapi-host": "booking-com.p.rapidapi.com",
          "x-rapidapi-key": BOOKING_API,
        },
      };

      const { data } = await axios.request(options);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BookingAPI;
