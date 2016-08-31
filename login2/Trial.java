import java.io.*;

public class Trial {

    public static void main(String[] args) {

        String csvFile = "/Users/mkyong/csv/country.csv";
        BufferedReader br = null;
        String line = "";
        String cvsSplitBy = ",";

        try {

            br = new BufferedReader(new FileReader(csvFile));
            while ((line = br.readLine()) != null) {

                String[] subscriber = line.split(cvsSplitBy);

                System.out.println("ServiceId is " + subscriber[0]);
		System.out.println("TranId is " + subscriber[0]);
		System.out.println("NDC is " + subscriber[0]);
		System.out.println("Subs is " + subscriber[0]);

            }
	}

         catch (Exception e) {
            e.printStackTrace();
       }
	}
	}