import { DownloadIcon, Share2Icon, ImageIcon, Link2Icon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { toBlob, toPng, toSvg } from "html-to-image"
import { toast } from "react-hot-toast"
import useStore from "@/store"


const ExportOptions = ({ targetRef }) => {

  const title = useStore(state => state.title)

  const copyImage = async () => {
    const imgBlob = await toBlob(targetRef.current, {
      pixelRatio: 2
    })
    const img = new ClipboardItem({ "image/png": imgBlob })
    navigator.clipboard.write([img])
  }

  const copyLink = () => {
    const state = useStore.getState();
    const queryParams = new URLSearchParams({
      ...state,
      code: btoa(state.code)
    }).toString()
    navigator.clipboard.writeText(`${location.href}?${queryParams} `)
  }

  const saveImage = async (name, format) => {
  let imgUrl, filename
  switch (format) {
    case "PNG":
      imgUrl = await toPng(targetRef.current, { pixelRatio: 2 })
      filename = `${name}.png`
      break;

    case "SVG":
      imgUrl = await toSvg(targetRef.current, { pixelRatio: 2 })
      filename = `${name}.svg`
      break;

    default:
      return;
  }
  const a = document.createElement("a");
  a.href = imgUrl
  a.download = filename
  a.click()
}

return (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button>
        <Share2Icon className="mr-2" />
        Export
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="dark bg-[#120021]">

      <DropdownMenuItem className="gap-2" onClick={() => toast.promise(copyImage(), {
        loading: "Copying...",
        success: "Image has been Copied!",
        error: "Something went Wrong!",
      })}>
        <ImageIcon />Copy Image
      </DropdownMenuItem>

      <DropdownMenuItem className="gap-2" onClick={() => {
        copyLink()
        toast.success("Link has been Copied!")
      }}>
        <Link2Icon />Copy Link
      </DropdownMenuItem>

      <DropdownMenuSeparator className="bg-white"/>

      <DropdownMenuItem className="gap-2" onClick={() => toast.promise(saveImage(title, "PNG"),{
        loading: "Saving as PNG...",
        success: "Saved Successfully!",
        error: "Something went Wrong!",
      })}>
        <DownloadIcon />Save as PNG
      </DropdownMenuItem>

      <DropdownMenuItem className="gap-2" onClick={() => toast.promise(saveImage(title, "SVG"),{
        loading: "Saving as SVG...",
        success: "Saved Successfully!",
        error: "Something went Wrong!",
      })}>
        <DownloadIcon />Save as SVG
      </DropdownMenuItem>

    </DropdownMenuContent>
  </DropdownMenu>
)
}

export default ExportOptions