"use-client"
import Link from "next/link";
import NextLink from "next/link";
import { ComponentProps, FC } from "react";
import styles from "./link.module.css";
import { usePathname } from "next/navigation";

type Props = ComponentProps<typeof NextLink>;

export const RacketLink: FC<Props> = ({ children, ...props }) => {
  const pathname = usePathname();

  const isActive = pathname === props.href;

  return (
    <Link
      {...props}
      className={`${isActive && styles.activeLink } ${styles.link}`}
    >
      {children}
    </Link>
  );
};

export default RacketLink;
