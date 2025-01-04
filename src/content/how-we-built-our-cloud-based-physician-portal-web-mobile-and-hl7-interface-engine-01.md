---
title: "How we built our cloud based physician portal web, mobile and HL7 Interface engine – 01"
slug: how-we-built-our-cloud-based-physician-portal-web-mobile-and-hl7-interface-engine-01
date: 2018-09-18T12:00:00.000Z
published: true
description: AZ-Tech Radiology is one of the leading medical imaging organization that provides the highest quality imaging services utilizing state-of-the-art equipment and technologies in Arizona.
industries: ['Technology','Software Development','Web Design']
coverImage:
ogImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:JIRA%20to%20DuckDB%20Bot:%20A%20Simple%20Python%20Data%20Pipeline%20with%20DLThub,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
author: Senthilnathan Karuppaiah
avatar: "https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg"
type: Blog
tags: ['Cloud Hosting', 'Healthcare', 'Web Service']
---

<a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400"  href = "https://senthilsweb.wordpress.com/2018/09/18/az-tech-radiology-how-we-built-our-cloud-based-physician-portal-web-mobile-and-hl7-interface-engine-01/www.aztechradiology.com">AZ-Tech Radiology</a> is one of the leading medical imaging organization that provides the highest quality imaging services utilizing state-of-the-art equipment and technologies in Arizona.  Our primary goal is “Keeping the referring physician happy”, all roads lead to the ease of delivery of “radiology reports” to them and their sending of orders to the lab”

In order to meet the goal, we have to have state of the art technological solution which drove us to build the new cloud based connected IT systems:

::list{type="success"}
1. Radiology Information System
2. HL7 Interface Engine which connects all of our modalities, external EMR and Insurance companies, pushing data to the cloud in a secure manner.
3. Promotional Website @ [https://www.aztechradiology.com](https://www.aztechradiology.com)
4. Physician Portal to delivering the reports @ [https://provider.aztechradiology.com/](https://provider.aztechradiology.com/)
5. Physician mobile app @ [https://m.provider.aztechradiology.com/](https://m.provider.aztechradiology.com/)
::

In this blog post I would like to share the Architecture we came up with which powers our IT systems.

## HL7 Interface of our Modalities (Imaging equipment) with RIS

![HL7](https://senthilsweb.wordpress.com/wp-content/uploads/2018/09/az-tech-hl7-architecture1.png)

## Industry standard HL7 messages going out from RIS & coming in to Helen RIS

|                                              |                                                        |
|----------------------------------------------|--------------------------------------------------------|
|   ADT A28                                    | 	Add person information                              |
|   ADT A31                                    |    Update person information                           |
|   ORM O01                                    |    Order message                                       |
|   ORU R01                                    |    Unsolicited transmission of an Observation message  |
|   SIU S12                                    | 	Notification of new appointment booking             |
|   SIU S14                                    | 	Notification of appointment modification            |
|   SIU S15                                    | 	Notification of appointment cancellation            |
|                                              |                                                        |


## End-to-end HL7 interface engine – on-prem to cloud connectivity

![Industry standard HL7](https://senthilsweb.wordpress.com/wp-content/uploads/2018/09/az-tech-interface-architecture.png)

## Industry standard HL7 messages going out from RIS & coming in to Helen RIS

::list{type="success"}
1. Available On Web And Mobile
2. Highly Secure With Two Factor Authentication
3. Immediate Near Real Time Access To Reports
4. Text/Email Notification When Stat Report Is Ready
5. Reports Can Be Searched By Dob, Patient Name, Date Etc.
6. Reports Can Be Filtered By Stat
7. Lightning Fast Free Text (Natural Language) Search Against Reports Powered By Elasticsearch & Lucene Index
8. Cross The Border – (we call Inter State) : Multi Location Clinics Can Search Reports /Patients Across Their Locations Served
9. Cross The Border – (we call Inter Country) : Providers Can View Reports Of Other Providers With Online Consent
10. Reports In Hl7 Format Can Be Exported To Import Into Their EHR System
11. Orders Can Be Placed Online – Hl7 Upload And Forms Based Upload
12. High Resolution Diagnostic Images Can Be Viewed Online Without Any Client Tools Installation.
13. Real-Time Analytics / Kpi Dashboard For Clinic Administrators
14. Create And Manage Your Users & Roles Online
15. View Who Did What, When?
16. Free Integration With our partner’s EHR / EMR Software’s For Orders And Reports
17. HIPAA Compliance ready
::

## End result

After we implemented the solutions in phased manner starting from Jan 2018 uptil now, following are the benefits we gained

::list{type="success"}
1. Average speed of our report delivery time reduced from **days** to **minutes**
2. Cost of the delivery of reports reduced multi-fold otherwise we enagened half a dozen employees faxing the reports to the physician office manually
3. We can deliver the reports to physican hands thru our mobile solution
4. We automated the sending of Fax (reports) to the clinics who still needs paper copy of the reports
5. Customer satisfaction thru enhanced user experience in the form of simple to use web and mobile application
6. Powers 1000’s of reports per day with ability to auto-scale to handle more reports in the future
::
