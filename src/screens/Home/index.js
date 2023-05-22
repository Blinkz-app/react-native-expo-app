import React, {useEffect, useState} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import Post from '../../components/Post/index';

import {listPosts} from '../../flureeql/queries';
// import fetchDataFromFluree from '../../backend/api/apiquery';
import fetchDataFromFluree from '../../backend/api/api';


const Home = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      // fetch all the posts
      try {
        const response = await fetchDataFromFluree()
        setPosts(response);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPost();
  }, []);

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height - 130}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />

    </View>
  );
};

export default Home;
