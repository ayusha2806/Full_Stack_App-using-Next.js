import { Fragment } from 'react';
import Head from 'next/head';

import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetups App</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://ayush_530:Ayush2anand@cluster0.eezvjo5.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title || 'No Title',
        address: meetup.address || 'No Address',
        image: meetup.image || 'No Image',
        description: meetup.description || 'No Description',
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;