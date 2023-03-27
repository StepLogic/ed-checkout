import React from "react";
import { pdf, Document, Page, StyleSheet, View, Text, Font, Svg, Path, Link } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import font from "@assets/font/PoppinsMedium.ttf";
import { v4 as uuidV4 } from "uuid";
import { fontSize } from "@mui/system";

const Logo = () => {
  return (
    <Svg width={200} preserveAspectRatio="16/9">
      <Path d="M63.858 17.1194V19.0763H50.9453C51.4426 18.6272 51.6912 17.9535 51.6912 16.6702V3.30038C51.6912 2.02515 51.4426 1.35145 50.9453 0.894287H63.5853V2.87531C63.1362 2.40211 62.5587 2.17754 61.2594 2.17754H57.0408V8.49754H59.9601C60.7668 8.57484 61.5746 8.36152 62.2379 7.89602V10.3502C61.5746 9.88474 60.7668 9.67142 59.9601 9.74872H57.0408V17.8172H61.5161C62.7833 17.8172 63.3848 17.5926 63.834 17.1194H63.858Z" fill="#2D224C" />
      <Path
        d="M74.2843 19.0764L74.0838 16.927C73.6562 17.6722 73.0302 18.2841 72.2755 18.6948C71.5208 19.1054 70.6669 19.2986 69.809 19.2529C67.1061 19.2529 64.9326 17.1756 64.9326 12.6522C64.9326 8.1287 67.4831 6.0354 70.0095 6.0354C70.8336 6.02315 71.646 6.23163 72.3625 6.63919C73.0789 7.04676 73.6732 7.63858 74.0838 8.35326V3.17214C74.1619 2.37543 73.9482 1.57745 73.4823 0.926461C74.6773 0.854278 77.6047 0.653768 79.3772 0.429199V16.8227C79.3129 17.6255 79.5376 18.4248 80.0108 19.0764H74.2843ZM74.0838 15.3791V9.92525C73.9667 9.56711 73.739 9.25536 73.4334 9.03485C73.1279 8.81434 72.7603 8.69645 72.3835 8.69814C71.2045 8.69814 70.611 9.54829 70.5869 12.7083C70.5629 15.8683 71.2045 16.7185 72.3835 16.7185C72.7726 16.714 73.1495 16.5821 73.4565 16.3432C73.7636 16.1042 73.9839 15.7712 74.0838 15.3951V15.3791Z"
        fill="#2D224C"
      />
      <Path
        d="M90.1001 19.0763L89.9718 16.9269C89.5893 17.6715 88.9977 18.2883 88.2697 18.7014C87.5416 19.1146 86.7088 19.3062 85.8734 19.2528C83.0502 19.2528 81.8632 17.6487 81.8632 14.6571V8.52159C81.91 8.19597 81.88 7.86392 81.7755 7.55198C81.6711 7.24004 81.4951 6.95685 81.2617 6.72504C83.0823 6.64484 85.2077 6.42027 87.1567 6.22778V14.8175C87.1567 15.8201 87.4053 16.6462 88.4319 16.6462C88.7089 16.6373 88.9773 16.5475 89.2039 16.3879C89.4305 16.2283 89.6055 16.0058 89.7071 15.7479V8.52961C89.7539 8.20399 89.7238 7.87194 89.6194 7.56C89.515 7.24806 89.339 6.96487 89.1056 6.73306C90.9342 6.65286 93.0596 6.42829 95.0085 6.2358V16.8226C94.933 17.6255 95.1431 18.4293 95.602 19.0924L90.1001 19.0763Z"
        fill="#2D224C"
      />
      <Path
        d="M61.5636 22.9983L60.9861 24.4981C60.0689 23.7819 58.9416 23.3873 57.778 23.3753C56.3022 23.3753 55.6285 23.7522 55.6285 24.6264C55.6285 26.2947 62.2052 26.9684 62.2052 30.9224C62.2052 33.922 59.5745 35.2935 55.3799 35.2935C53.6845 35.3896 51.9938 35.0354 50.4795 34.2669L51.0329 32.7911C52.0899 33.5475 53.3583 33.9516 54.6581 33.9461C56.2621 33.9461 56.9759 33.4969 56.9759 32.5425C56.9759 30.3209 50.5597 30.6738 50.4795 26.3749C50.4795 23.9688 52.3562 22.0519 57.1765 22.0519C58.6933 22.0133 60.1975 22.3377 61.5636 22.9983Z"
        fill="#2D224C"
      />
      <Path d="M77.6045 28.7008C77.6045 32.2778 74.9338 35.3255 70.3863 35.3255C65.5741 35.3255 63.168 32.5024 63.168 28.7008C63.168 25.1317 65.8708 22.084 70.3863 22.084C75.1343 22.0519 77.6045 24.8751 77.6045 28.7008ZM68.7822 28.7008C68.7822 33.3285 69.2073 34.315 70.3863 34.315C71.5652 34.315 71.9903 33.3445 71.9903 28.7008C71.9903 24.057 71.5893 23.1347 70.3863 23.1347C69.1832 23.1347 68.7822 24.049 68.7822 28.7008Z" fill="#2D224C" />
      <Path
        d="M100.919 35.117H107.44C106.974 34.4568 106.761 33.6515 106.838 32.8473V27.2331C106.838 24.2094 105.82 22.0359 102.467 22.0359C101.683 22.0034 100.905 22.1867 100.218 22.5657C99.5304 22.9446 98.9602 23.5049 98.5692 24.1853V22.2204C97.1175 22.4048 95.0723 22.7497 93.6768 22.9582C91.8455 23.2017 89.9961 23.2796 88.1508 23.1908C87.0744 22.5232 85.8119 22.2195 84.5497 22.3246C81.1812 22.3246 78.9355 24.3457 78.9355 26.824C78.9387 27.5649 79.1396 28.2915 79.5175 28.9287C79.8953 29.566 80.4364 30.0909 81.0849 30.4492C80.5389 30.7652 80.091 31.2262 79.7908 31.7811C79.4907 32.336 79.3501 32.9632 79.3846 33.5932C79.3735 34.008 79.4451 34.421 79.5952 34.8079C79.7453 35.1948 79.9709 35.548 80.2588 35.8469C79.8578 35.9849 79.5089 36.2428 79.2593 36.5856C79.0097 36.9285 78.8714 37.3397 78.8633 37.7637C78.8633 39.3678 81.6062 40.1698 84.7823 40.1698C88.5598 40.1698 91.4792 38.7182 91.4792 36.1597C91.4792 33.906 89.6025 32.5345 84.8063 32.4623L82.4002 32.4142C81.6544 32.4142 81.4218 32.0854 81.4218 31.7325C81.4416 31.554 81.5106 31.3845 81.6211 31.2429C81.7315 31.1013 81.8791 30.9931 82.0473 30.9304C82.8711 31.1967 83.7321 31.3294 84.5978 31.3234C88.0225 31.3234 90.2682 29.3023 90.2682 26.8561C90.3055 25.7871 89.9193 24.7465 89.1934 23.9608L93.4923 24.1693C93.548 24.433 93.5749 24.7019 93.5725 24.9713V32.8713C93.65 33.6755 93.4366 34.4808 92.971 35.1411H99.4675C99.0019 34.4808 98.7885 33.6755 98.8659 32.8713V25.3483C99.0214 25.1195 99.2368 24.9378 99.4886 24.8232C99.7404 24.7086 100.019 24.6655 100.294 24.6986C101.32 24.6986 101.569 25.5007 101.569 26.4952V32.8473C101.632 33.6574 101.402 34.4633 100.919 35.117ZM81.4779 36.3923L86.2901 36.6168C87.8942 36.689 88.5117 36.9938 88.5117 37.5712C88.5117 38.1487 87.6696 39.1753 84.7662 39.1753C83.3466 39.1753 81.3175 38.6219 81.3175 37.4028C81.2979 37.0584 81.3526 36.7137 81.4779 36.3923ZM84.5497 30.3931C83.6514 30.3931 83.2985 29.7434 83.3306 26.824C83.3627 23.9046 83.6514 23.2229 84.5497 23.2229C85.448 23.2229 85.8009 23.8485 85.8009 26.824C85.8009 29.7996 85.5041 30.3931 84.5497 30.3931Z"
        fill="#2D224C"
      />
      <Path d="M123.136 28.7008C123.136 32.2778 120.457 35.3255 115.918 35.3255C111.105 35.3255 108.699 32.5024 108.699 28.7008C108.699 25.1317 111.394 22.084 115.918 22.084C120.658 22.0519 123.136 24.8751 123.136 28.7008ZM114.313 28.7008C114.313 33.3285 114.739 34.315 115.918 34.315C117.096 34.315 117.522 33.3445 117.522 28.7008C117.522 24.057 117.121 23.1347 115.918 23.1347C114.714 23.1347 114.338 24.049 114.313 28.7008Z" fill="#2D224C" />
      <Path
        d="M0 0.9104H45.0581V1.56005C45.0581 8.68209 45.1303 15.7961 45.0581 22.9101C44.9058 34.9406 39.5081 43.763 28.9614 49.5296C27.1006 50.5401 25.2159 51.4945 23.3471 52.4891C23.1033 52.6298 22.8267 52.704 22.5451 52.704C22.2635 52.704 21.9869 52.6298 21.7431 52.4891C19.6017 51.3502 17.4281 50.2754 15.3268 49.0884C11.443 47.0159 8.08655 44.0799 5.51561 40.5065C2.94468 36.933 1.22785 32.8174 0.49726 28.4762C0.191221 26.7447 0.0409062 24.9893 0.0481215 23.2309C-4.27255e-07 16.0127 0.0481215 8.79437 0.0481215 1.57609L0 0.9104ZM2.34995 3.23629V3.76564C2.34995 10.2541 2.34995 16.7425 2.34995 23.2309C2.35348 24.6135 2.45802 25.994 2.66274 27.3614C3.18763 31.1777 4.54803 34.8311 6.64694 38.0613C8.74585 41.2915 11.5316 44.0188 14.8055 46.0487C17.2116 47.5806 19.7701 48.7756 22.2724 50.107C22.365 50.1465 22.4645 50.1669 22.5652 50.1669C22.6658 50.1669 22.7654 50.1465 22.8579 50.107C24.0128 49.5215 25.1357 48.8879 26.2986 48.3105C29.75 46.7211 32.871 44.4953 35.4979 41.7498C40.064 36.9185 42.629 30.536 42.6761 23.8886C42.7723 17.1836 42.6761 10.4786 42.6761 3.77365C42.6761 3.60523 42.6761 3.42878 42.6761 3.23629H2.34995Z"
        fill="#2D224C"
      />
      <Path d="M25.5685 15.5234H18.4385V33.4488H25.5685V15.5234Z" fill="#2D224C" />
      <Path d="M18.3239 22.1327L13.46 20.395L9.38007 31.8148L14.2441 33.5525L18.3239 22.1327Z" fill="#2D224C" />
      <Path d="M27.8162 11.5999L24.6553 12.7642L32.2423 33.3629L35.4033 32.1987L27.8162 11.5999Z" fill="#2D224C" />
    </Svg>
  );
};

Font.register({ family: "Poppins", src: font });

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    fontSize: "12px",
    padding: "50px",
    fontFamily: "Poppins",
    color: "#2d224c",
    backgroundColor: "rgba(255, 255, 255)",
  },
  logo: {
    width: "122px",
    aspectRatio: "16/9",
  },
  vertical: {
    display: "flex",
    flexDirection: "column",
  },
  headingText: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    marginTop: "20px",
  },

  table: {
    display: "grid",
    gridTemplateColumns: 'repeat(3, "1fr")',
    gridTemplateRows: 'repeat(5, "1fr")',
    gridColumnGap: "5px",
    gridRowGap: "5px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignContent: "stretch",
    alignItems: "center",
  },
  cell: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    margin: 8,
  },
  header: {
    backgroundColor: "#2d224c",
  },
  bold: {
    fontWeight: 900,
    fontSize: 12,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 1200,
    color: "#fff",
    margin: 8,
  },
  tableText: {
    margin: 10,
    fontSize: 10,
  },
});

export const PdfInvoice = ({ invoice, user }) => {
  const price = invoice.amount;
  const price_no_iva = (price - (price / 100) * 18.0327868852459).toFixed(2);
  const iva = ((price / 100) * 18.0327868852459).toFixed(2);

  return (
    <Document>
      <Page size={"A4"}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View style={style.container}>
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Logo />
                </View>

                <View>
                  <View style={style.vertical}>
                    <Text style={style.headingText}>Edusogno Srl</Text>
                    <Text>Via Ospedale di Venere 82/b</Text>
                    <Text>Bari (BA), 70131</Text>
                    <Text>IT08587960728</Text>
                  </View>
                </View>
              </View>
              <View style={style.vertical}>
                <Text style={style.headingText}>{user.name}</Text>
                <Text>{user.location},</Text>
                <Text>{user.citta + " " + user.cap}</Text>
              </View>

              <View
                style={{
                  marginTop: 50,
                }}
              >
                <View style={style.table}>
                  <View style={[style.row, style.header]}>
                    <Text style={[style.headerText, style.cell]}>Product</Text>
                    <Text style={[style.headerText, style.cell]}>Price</Text>
                    <Text style={[style.headerText, style.cell]}>Net Price</Text>
                  </View>
                  <View style={[style.row]}>
                    <Text style={[style.cell, style.bold]}>{invoice.paid_for} </Text>
                    <Text style={[style.cell, style.bold]}>{invoice.amount}€</Text>
                    <Text style={[style.cell, style.bold]}>{price_no_iva}€</Text>
                  </View>
                  <View style={[style.row]}>
                    <Text style={[style.cell]}></Text>
                    <Text style={[style.cell]}>Net Amount</Text>
                    <Text style={[style.cell]}>{price_no_iva} €</Text>
                  </View>
                  <View style={[style.row]}>
                    <Text style={[style.cell]}></Text>
                    <Text style={[style.cell]}>IVA (22%)</Text>
                    <Text style={[style.cell]}>{iva} €</Text>
                  </View>
                  <View style={[style.row]}>
                    <Text style={[style.cell]}></Text>
                    <Text style={[style.cell]}></Text>
                    <Text style={[style.cell, { fontWeight: 1200, fontSize: 20 }]}>{invoice.amount} €</Text>
                  </View>
                </View>

                <View style={[style.table, { fontSize: 10, fontWeight: 400, marginTop: 30, padding: 5, border: "1px solid #2d224c" }]}>
                  <View style={[style.row]}>
                    <Text style={[style.cell]}>Data di emissione:</Text>
                    <Text style={[style.cell]}>{invoice.data}</Text>
                  </View>
                  <View style={[style.row]}>
                    <Text style={[style.cell]}>Metodo di pagamento:</Text>
                    <Text style={[style.cell]}>{invoice.type}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ width: "100%", fontSize: 10, paddingVertical: "20px", paddingHorizontal: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Text>Edusogno Srl - P. IVA: IT08587960728</Text>
            <View>
              <Link
                style={{
                  color: "#2d224c",
                  textDecoration: "none",
                }}
                src="https://edusogno.com"
              >
                <Text>edusogno.com</Text>
              </Link>
            </View>
            <View>
              <Link
                style={{
                  color: "#2d224c",
                  textDecoration: "none",
                }}
                src="mailto:info@edusogno.com"
              >
                <Text>info@edusogno.com</Text>
              </Link>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const generatePDFDocument = async (invoice, user) => {
  // pdf(<PdfInvoice invoice={invoice} user={user} />)
  //   .toBlob()
  //   .then((blob) => saveAs(blob, "edusogno_invoice_" + uuidV4()));

  const blob = await pdf(<PdfInvoice invoice={invoice} user={user} />).toBlob();

  saveAs(blob, `edusogno_invoice_${uuidV4()}.pdf`);
};

export default generatePDFDocument;
