import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const getStaticProps = async () => {
  const res = await fetch("https://flaskapi2-a8hs.onrender.com/");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  // const keys = ["title", "author"];
  const filteredBooks = data.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex_class">
        <h1>Book Catlog</h1>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="book_box">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book_card">
            <div className="book_image">
              <Image
                src={`${book.cover_image}`}
                alt="Picture of the author"
                width={120}
                height={160}
                className="image"
              />
            </div>

            <div className="featurde_book_tag">
              <p className="">Ttile : {book.title}</p>
              <p className="">Author : {book.author}</p>
              <div className="categories">Genre : {book.genre}</div>
              <p className="book_price">Free/Paid : {book.free_or_paid}</p>
              <Link href={`/${book.id}`}>
                <p className="btn">Learn More</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .flex_class {
          position: sticky;
          top: 0;
          z-index: 10;
          background: #000;
          width: 95%;
          height: 60px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
        }
        .flex_class h1 {
          font-size: 24px;
        }
        .book_box {
          width: 95%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          grid-gap: 25px 0;
        }
        .book_box .book_card {
          width: 250px;
          height: 340px;
          text-align: center;
          padding: 5px;
          border: 1px solid #919191;
          margin: auto 20px;
        }
        .book_box .book_card:hover {
          box-shadow: 0 0 5px #089da1;
        }
        .book_box .book_card .book_image {
          width: 150px;
          height: 170;
          margin: 0 auto;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
          justify-content: center;
          overflow: hidden;
        }
        book_box .book_card .book_image image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          margin: 0 auto;
        }
        input {
          margin-bottom: 10px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          height: 30px;
          align-self: center;
        }
        .featurde_book_tag p {
          margin-bottom: 4px;
        }
        .featurde_book_tag .btn {
          background-color: #2563eb;
          margin: 4px;
        }
      `}</style>
    </div>
  );
}
