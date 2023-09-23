import Image from "next/image";
import Link from "next/link";

export const getStaticPaths = async () => {
  const res = await fetch("https://flaskapi2-a8hs.onrender.com/");
  const data = await res.json();

  const paths = data.map((currBook) => {
    return {
      params: {
        bookDetails: currBook.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.bookDetails;
  const res = await fetch(`https://flaskapi2-a8hs.onrender.com/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const bookDetails = ({ data }) => {
  return (
    <>
      <div className="flexClass">
        <Link href={"/"}>
          <h1 className="nav">Book Catlog</h1>
        </Link>
      </div>
      <div className="container">
        <div className="cover">
          <Image
            src={`${data.cover_image}`}
            alt={data.title}
            width={300}
            height={400}
          />
        </div>
        <div className="details">
          <h1>
            <strong>Title</strong> : {data.title}
          </h1>
          <p>
            <strong>Author</strong> : {data.author}
          </p>
          <p>
            <strong>Genre</strong> : {data.genre}
          </p>
          <p>
            <strong>Publication_date</strong> : {data.publication_date}
          </p>
          <p>
            <strong>Free/Paid</strong> : {data.free_or_paid}
          </p>
          <h2>
            <strong>Summary</strong>
          </h2>
          <p>{data.brief_summary}</p>
        </div>
      </div>
      <style jsx>{`
        .flexClass {
          z-index: 10;
          background: #000;
          width: 95%;
          height: 40px;
          margin: 0 auto;
        }
        .flexClass .nav {
          font-size: 24px;
          align-self: center;
        }
        .container {
          height: 100%;
          width: 50%;
          margin: 9% auto;
          display: flex;
          align-items: center;
        }

        .cover {
          margin-right: 80px;
        }

        .details {
          max-width: 600px;
        }

        h1,
        h2 {
          margin-bottom: 10px;
        }

        p {
          margin-bottom: 5px;
        }
      `}</style>
    </>
  );
};

export default bookDetails;
