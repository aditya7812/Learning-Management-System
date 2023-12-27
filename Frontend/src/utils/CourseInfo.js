export function CourseInfo(courses) {
  let studentsEnrolled = 0;
  courses?.forEach((course) => {
    studentsEnrolled += course.studentsEnrolled.length;
  });

  let totalRating = 0;
  let ratingLength = 0;
  courses?.forEach((course) => {
    course.ratingAndReviews.forEach((review) => {
      totalRating += review.rating;
    });
    ratingLength += course.ratingAndReviews.length;
  });

  let ratingAvg = 0;
  if (ratingLength > 0) {
    ratingAvg = totalRating / ratingLength;
  }

  return {
    studentsEnrolled: studentsEnrolled,
    ratingLength: ratingLength,
    ratingAvg: ratingAvg,
  };
}
