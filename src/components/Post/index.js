import React, { useEffect, useState } from 'react';
import { View, TouchableWithoutFeedback, Text, Image, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import styles from './styles';
import { AntDesign, FontAwesome, Fontisto } from '@expo/vector-icons';

const Post = (props) => {
  const [post, setPost] = useState(props.post);
  const [isLiked, setIsLiked] = useState(false);
  const [videoUri, setVideoUri] = useState('');

  const [videoStatus, setVideoStatus] = useState(null);

  const onPlayPausePress = () => {
    if (videoStatus && videoStatus.isPlaying) {
      videoStatus.pauseAsync();
    } else {
      videoStatus.playAsync();
    }
  };

  const onLikePress = () => {
    const likesToAdd = isLiked ? -1 : 1;
    setPost({
      ...post,
      likes: post.likes + likesToAdd,
    });
    setIsLiked(!isLiked);
  };

  const getVideoUri = async () => {
    if (post.videoUri.startsWith('http')) {
      setVideoUri(post.videoUri);
      return;
    }
  };

  useEffect(() => {
    getVideoUri();
  }, []);

  const handleVideoRef = (component) => {
    setVideoStatus(component);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <View>
          <Video
            ref={handleVideoRef}
            source={{ uri: videoUri }}
            style={styles.video}
            onError={(e) => console.log(e)}
            resizeMode="cover"
            shouldPlay={false}
            isLooping
          />

          <View style={styles.uiContainer}>
            <View style={styles.rightContainer}>
              <Image style={styles.profilePicture} source={{ uri: post.user.imageUri }} />

              <TouchableOpacity style={styles.iconContainer} onPress={onLikePress}>
                <AntDesign name="heart" size={40} color={isLiked ? 'red' : 'white'} />
                <Text style={styles.statsLabel}>{post.likes}</Text>
              </TouchableOpacity>

              <View style={styles.iconContainer}>
                <FontAwesome name="commenting" size={40} color="white" />
                <Text style={styles.statsLabel}>{post.comments}</Text>
              </View>

              <View style={styles.iconContainer}>
                <Fontisto name="share-a" size={35} color="white" />
                <Text style={styles.statsLabel}>{post.shares}</Text>
              </View>
            </View>

            <View style={styles.bottomContainer}>
              <View>
                <Text style={styles.handle}>@{post.user.username}</Text>
                <Text style={styles.description}>{post.description}</Text>

                <View style={styles.songRow}>
                  <FontAwesome name="music" size={24} color="white" />
                  <Text style={styles.songName}>{post.song.name}</Text>
                </View>
              </View>

              <Image style={styles.songImage} source={{ uri: post.song.imageUri }} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Post;
