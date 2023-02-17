import React from 'react';

function Calendar() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="none">
      <path
        d="M12.6562 1.17188H11.8945V0.585938C11.8945 0.263672 11.6309 0 11.3086 0C10.9863 0 10.7227 0.263672 10.7227 0.585938V1.17188H8.05664V0.585938C8.05664 0.263672 7.79297 0 7.4707 0C7.14844 0 6.88477 0.263672 6.88477 0.585938V1.17188H4.24805V0.585938C4.24805 0.263672 3.98438 0 3.66211 0C3.33984 0 3.07617 0.263672 3.07617 0.585938V1.17188H2.34375C1.05176 1.17188 0 2.22363 0 3.51562V12.6562C0 13.9482 1.05176 15 2.34375 15H6.82617C7.14844 15 7.41211 14.7363 7.41211 14.4141C7.41211 14.0918 7.14844 13.8281 6.82617 13.8281H2.34375C1.69629 13.8281 1.17188 13.3037 1.17188 12.6562V3.51562C1.17188 2.86816 1.69629 2.34375 2.34375 2.34375H3.07617V2.92969C3.07617 3.25195 3.33984 3.51562 3.66211 3.51562C3.98438 3.51562 4.24805 3.25195 4.24805 2.92969V2.34375H6.88477V2.92969C6.88477 3.25195 7.14844 3.51562 7.4707 3.51562C7.79297 3.51562 8.05664 3.25195 8.05664 2.92969V2.34375H10.7227V2.92969C10.7227 3.25195 10.9863 3.51562 11.3086 3.51562C11.6309 3.51562 11.8945 3.25195 11.8945 2.92969V2.34375H12.6562C13.3037 2.34375 13.8281 2.86816 13.8281 3.51562V6.85547C13.8281 7.17773 14.0918 7.44141 14.4141 7.44141C14.7363 7.44141 15 7.17773 15 6.85547V3.51562C15 2.22363 13.9482 1.17188 12.6562 1.17188Z"
        fill="black"
        className="calendar"
      />
      <path
        d="M9.5 4C6.46818 4 4 6.46818 4 9.5C4 12.5318 6.46818 15 9.5 15C12.5318 15 15 12.5318 15 9.5C15 6.46818 12.5318 4 9.5 4ZM9.5 13.1818C7.46818 13.1818 5.81818 11.5318 5.81818 9.5C5.81818 7.46818 7.46818 5.81818 9.5 5.81818C11.5318 5.81818 13.1818 7.46818 13.1818 9.5C13.1818 11.5318 11.5318 13.1818 9.5 13.1818Z"
        fill="black"
        stroke="white"
        strokeWidth="0.7"
        className="clock"
      />
      <path
        d="M11.5 9.02469H9.73913V7.98765C9.73913 7.44444 9.34783 7 8.86957 7C8.3913 7 8 7.44444 8 7.98765V10.0123C8 10.5556 8.3913 11 8.86957 11H11.5C11.9783 11 12.5 10.5556 12.5 10.0123C12.5 9.46914 11.9783 9.02469 11.5 9.02469Z"
        fill="black"
        stroke="white"
        strokeWidth="0.7"
        className="clock"
      />
    </svg>
  );
}

export default Calendar;
