const listPosts ={
    select: [
      "*",
      {
        "user": ["*"],
        "song": ["*"],
      }
    ],
    from: "post"
  };