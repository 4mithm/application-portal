import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { TableRow, TableCell } from "@mui/material";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor:0,

		fontSize: 20,

		color: "black",
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 16,
        fontFamily:"Poppins",
		padding:'10px'
	},
}));
