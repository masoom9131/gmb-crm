export default class MockGbpClient {
  async listLocations() {
    return [
      { id: "loc_1", name: "MBG CART - Sidhi", rating: 4.8 },
      { id: "loc_2", name: "MBG CART - Rewa", rating: 4.5 },
      { id: "loc_3", name: "MBG CART - Satna", rating: 4.2 },
    ];
  }
  async listReviews() {
    return [
      { id: "rev1", rating: 5, comment: "Best service!", author: "Amit Kumar", date: new Date(), replied: false },
      { id: "rev2", rating: 1, comment: "Delivery late thi", author: "Riya Singh", date: new Date(), replied: true },
    ];
  }
  async replyToReview(reviewId, replyText) { return { success: true }; }
  async createPost() { return { success: true, postId: "post_" + Date.now() }; }
  async getMetrics() { return { views: 1240, calls: 56, directionRequests: 89 }; }
}