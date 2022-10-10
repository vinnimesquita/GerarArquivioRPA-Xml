using Dapper;
using System.Data.SqlClient;
using System.Text;
using System.Xml;

namespace projetoRPA.Service
{
    public class QueryService : IQueryService
    {
        

        public string? GetXml(int mes, int ano, int filial)
        {
            //var ppessoas = _dbContext.Ppessoas.FromSqlRaw($"exec GeraScript {nome}").ToList();
            //return ppessoas;

            var sql = "exec [GeraScript] @mes, @ano, @filial";
            var parameter = new { mes, ano, filial };

            using (var connection = new SqlConnection("Data Source=SEU_BANCO;Initial Catalog=DATA_BASE;Integrated Security=True"))
            {
                connection.Open();
                var results = connection.Query<string>(sql, parameter).SingleOrDefault();


                Console.WriteLine(results);

                if (results == null)
                    return null;

                var xmlString = PrintXML(results);

                return xmlString;

                //XmlDocument xml = new XmlDocument();
                // xml.LoadXml(results); 

                //XmlNodeList xnList = xml.SelectNodes("/GovDigital/escrituracao");
                //foreach (XmlNode xn in xml)
                //{
                //    string scriptRpa = xn.InnerXml;
                //    Console.WriteLine(scriptRpa.ToList());
                //Console.WriteLine(xn);
                //string id = xn["id"].InnerText;
                //string nomeXml = xn["nome"].InnerText;
                //string cidadeXml = xn["cidade"].InnerText;
                //string ruaXml = xn["rua"].InnerText;
                //string bairroXml = xn["bairro"].InnerText;
                //string nacionalidadeXml = xn["nacionalidade"].InnerText; 
                //Console.WriteLine(" {0} {1} {2} {3} {4} {5}", id, nomeXml, cidadeXml, ruaXml, bairroXml, nacionalidadeXml);
                //}

                //Console.WriteLine(xnList);

                //Debug.WriteLine(xnList);
            }
        }

        public static string PrintXML(string xml)
        {
            string result = "";

            MemoryStream mStream = new MemoryStream();
            XmlTextWriter writer = new XmlTextWriter(mStream, Encoding.Unicode);
            XmlDocument document = new XmlDocument();


            try
            {

                    // Load the XmlDocument with the XML.
                    document.LoadXml(xml);

                    writer.Formatting = Formatting.Indented;

                    // Write the XML into a formatting XmlTextWri AS ter
                    document.WriteContentTo(writer);
                    writer.Flush();
                    mStream.Flush();

                    // Have to rewind the MemoryStream in order to read
                    // its contents.
                    mStream.Position = 0;

                    // Read MemoryStream contents into a StreamReader.
                    StreamReader sReader = new StreamReader(mStream);

                    // Extract the text from the StreamReader.
                    string formattedXml = sReader.ReadToEnd();

                    result = formattedXml;
                
            }
            catch (XmlException)
            {
                // Handle the exc
            }

            mStream.Close();
            writer.Close();

            return result;
        }
    }
}
