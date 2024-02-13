import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

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