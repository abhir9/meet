package com.telefonica.nmf.citrus;

import javax.jms.*;

public class TestJMS {
    String serverUrl = "tcp://deapvdf7.dev.de.pri.o2.com:46222";
    String userName = "Facade";
    String password = "facade_ems_e2e3";

    public void sendMessage(String queueName, String messageStr) {

        Connection connection = null;
        Session session;
        MessageProducer msgProducer;
        Queue destination;


        try {
            TextMessage msg;

            System.out.println("Publishing to destination '" + queueName + "'\n");

            ConnectionFactory factory = new com.tibco.tibjms.TibjmsConnectionFactory(serverUrl);
            connection = factory.createConnection(userName, password);
            session = connection.createSession(false, javax.jms.Session.AUTO_ACKNOWLEDGE);
            destination = session.createQueue(queueName);
            msgProducer = session.createProducer(null);

            msg = session.createTextMessage();
            msg.setStringProperty("Operation", "ActivateMSISDN");
            msg.setStringProperty("ServiceId", "66284674");
            msg.setStringProperty("Consumer", "SeBuLa");
            msg.setStringProperty("RequestTag", "U259086556764791353220000");
            msg.setStringProperty("ServiceVersion", "1");

            msg.setText(messageStr);
            msgProducer.send(destination, msg);
            System.out.println("Published message: " + messageStr);

        } catch (JMSException e) {
            e.printStackTrace();
        } finally {
            try {
                connection.close();
            } catch (JMSException e) {
                e.printStackTrace();
            }
        }

    }

    public static void main(String[] args) throws JMSException {
        String message = new StringBuilder()
                .append("<?xml version=\"1.0\" encoding=\"UTF-16\" standalone=\"yes\"?>")
                .append("<ActivateMSISDNRequest xmlns=\"http://nms.o2.com/interface/\">")
                .append("<ServiceRequestHeader>")
                .append("<Version>1</Version>")
                .append("<UserID>SeBuLa</UserID>")
                .append("<ServiceID>66284674</ServiceID>")
                .append("<Stack>SP606</Stack>")
                .append("<Consumer>SeBuLa</Consumer>")
                .append("<CallingDate>2016-07-25T10:40:39.023+02:00</CallingDate>")
                .append("<RequestTag>U259086556764791353220000</RequestTag>")
                .append("</ServiceRequestHeader>")
                .append("<SubscriptionID>9025327539</SubscriptionID>")
                .append("<Role>GV1</Role>")
                .append("<MSISDN>")
                .append("<CountryCode>49</CountryCode>")
                .append("<NDC>1590</NDC>")
                .append("<SubscriberNumber>8123169</SubscriberNumber>")
                .append("</MSISDN>")
                .append("</ActivateMSISDNRequest>")
                .toString();
        TestJMS testJMS = new TestJMS();
        testJMS.sendMessage("NMS.Facade.MSISDNManagement.V1", message);
    }

}
