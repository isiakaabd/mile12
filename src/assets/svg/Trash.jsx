import { SvgIcon } from "@mui/material";

function TrashIcon(props) {
  return (
    <SvgIcon viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M4.375 4.375L5.15625 16.875C5.19336 17.5973 5.71875 18.125 6.40625 18.125H13.5938C14.284 18.125 14.7996 17.5973 14.8438 16.875L15.625 4.375"
        stroke="#F76868"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.125 4.375H16.875H3.125Z" />
      <path
        d="M3.125 4.375H16.875"
        stroke="#F76868"
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M7.5 4.375V2.8125C7.49964 2.68929 7.52364 2.56722 7.57063 2.45331C7.61761 2.33941 7.68666 2.23591 7.77378 2.14879C7.86091 2.06166 7.9644 1.99262 8.07831 1.94563C8.19221 1.89865 8.31428 1.87464 8.4375 1.875H11.5625C11.6857 1.87464 11.8078 1.89865 11.9217 1.94563C12.0356 1.99262 12.1391 2.06166 12.2262 2.14879C12.3133 2.23591 12.3824 2.33941 12.4294 2.45331C12.4764 2.56722 12.5004 2.68929 12.5 2.8125V4.375M10 6.875V15.625M7.1875 6.875L7.5 15.625M12.8125 6.875L12.5 15.625"
        stroke="#F76868"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default TrashIcon;
