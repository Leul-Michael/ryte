import { ImageResponse } from "next/server"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const postTitle = searchParams.get("title")
  const postAuthor = searchParams.get("author")
  const centerItems = searchParams.get("center")
  const font = fetch(
    new URL("../../../public/fonts/kaisei-tokumin-bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer())
  const fontData = await font

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: centerItems ? "center" : "flex-start",
          justifyContent: "center",
          backgroundImage: `url(https://ryte-story.vercel.app/bg-og.jpg)`,
          backgroundPosition: "top",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#6aed05",
            fontSize: 50,
            fontFamily: "Kaisei Tokumin",
            letterSpacing: "-0.05em",
            fontStyle: "normal",
            marginLeft: 190,
            marginRight: 190,
          }}
        >
          Ryte
        </div>
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            paddingTop: 190,
            paddingBottom: 190,
            width: centerItems ? "70%" : "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: centerItems ? "center" : "flex-start",
            textAlign: centerItems ? "center" : "left",
            fontSize: centerItems ? 70 : 100,
            fontFamily: "Kaisei Tokumin",
            letterSpacing: "-0.05em",
            fontStyle: "normal",
            color: "white",
            lineHeight: "90px",
            whiteSpace: "pre-wrap",
            backgroundColor: "rgb(0,0,0,0.6)",
          }}
        >
          {postTitle}
        </div>
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 30,
            fontFamily: "Kaisei Tokumin",
            letterSpacing: "-0.05em",
            fontStyle: "normal",
            marginLeft: 190,
            marginRight: 190,
          }}
        >
          by {postAuthor}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "Kaisei Tokumin",
          data: fontData,
          style: "normal",
        },
      ],
    }
  )
}
