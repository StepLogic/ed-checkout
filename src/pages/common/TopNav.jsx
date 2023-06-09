import { WhatsApp } from "@mui/icons-material";
import { Box } from "@mui/material";
import logoEduWhite from "@assets/img/logoEduWhite.svg";
import cn from "classnames";
const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const TopNav = ({
  sx = {},
  hiddenLogo = false,
  hiddenLink = false,
  className,
}) => {
  return (
    <Box
      sx={sx}
      className={cn(className, "flex items-center justify-between mb-14")}
    >
      <Box>
        <img
          src={logoEduWhite}
          alt=""
          className={classNames(hiddenLogo && "opacity-0")}
        />
      </Box>
      <div
        className={classNames(
          hiddenLink && "opacity-0",
          "relative ml-auto h-fit w-fit help 3xl:text-2xl max:text-4xl text-white no-underline lg:text-edu-900"
        )}
      >
        <a
          className="no-underline"
          href="https://api.whatsapp.com/send?phone=3715467005"
          target={"_blank"}
        >
          <span className="text-xs font-regular md:text-base">
            Serve aiuto?
          </span>
          <WhatsApp className="pb-1" fontSize={"small"} />
        </a>
        <div className="absolute left-0 bg-white md:bg-edu-900 line bottom-1"></div>
      </div>
    </Box>
  );
};

export default TopNav;
