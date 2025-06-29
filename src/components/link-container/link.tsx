"use client";
import NextLink from "next/link";
import { ComponentProps, FC } from "react";
import styles from "./link.module.css";
import { usePathname } from "next/navigation";

type Props = ComponentProps<typeof NextLink>;

export const Link: FC<Props> = ({ children, ...props }) => {
  const pathname = usePathname();

  const isActive = pathname === props.href;

  return (
    <NextLink
      {...props}
      className={`${isActive && styles.activeLink} ${styles.link}`}
    >
      {children}
    </NextLink>
  );
};

export default Link;
