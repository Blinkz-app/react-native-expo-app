const listPosts ={
  select: [
    "*",
    "videoUri",
    {
      "user": ["*"],
      "song": ["*"],
    }
  ],
  from: "post"
};