import { getUserDtl } from "../../vrspages/Common/Common";
const userdType = getUserDtl()
export const VendorMENUITEMS = [
  
  {
    menutitle: "VENDOR MENU",
    Items: [
      {
        path: `${process.env.PUBLIC_URL}/dashboard`,
        icon: "home",
        type: "link",
        active: true,
        title: "Dashboard",
        
      },
      {
        path: `${process.env.PUBLIC_URL}/NewApplication`,
        icon: "grid",
        type: "link",
        active: false,
        title: "New Application",
      },
      
      {
        path: `${process.env.PUBLIC_URL}/ProductRequest`,
        icon: "grid",
        type: "link",
        active: false,
        title: "Product Request",
      },
      {
        path: `${process.env.PUBLIC_URL}/ProductList`,
        icon: "grid",
        type: "link",
        active: false,
        title: "Product List",
      },
      
     
    ],
  },

  {
    menutitle: "HELP",
    Items: [
      {
        path: `${process.env.PUBLIC_URL}/viewfile/VendorApprovalProcess.pdf/`,
        icon: "grid",
        type: "link",
        active: false,
        title: "Vendor Approval Process",
      },
      {
        path: `${process.env.PUBLIC_URL}/viewfile/EligibilityCriteria.pdf/`,
        icon: "grid",
        type: "link",
        active: false,
        title: "Eligibility Criteria",
      },
    ],
  },

 
];





export const DepartMENUITEMS = [
  
  {
    menutitle: "DEPERMENTAL MENU",
    Items: [
      {
        path: `${process.env.PUBLIC_URL}/DepartmentalDashboard`,
        icon: "home",
        type: "link",
        active: true,
        title: "Dashboard",
        view: ""
      },
      {
        path: `${process.env.PUBLIC_URL}/NewProduct`,
        icon: "grid",
        type: "link",
        active: false,
        title: "Product Request",
      },
      
      {
        path: `${process.env.PUBLIC_URL}/Minutes`,
        icon: "grid",
        type: "link",
        active: false,
        title: "Minutes",
      },
      {
        path: `${process.env.PUBLIC_URL}/allApplication`,
        icon: "grid",
        type: "link",
        active: false,
        title: "All Application",
      },

      
      
    ],
  },


];

export const DepartMENUITEMS_2 = [
  
  {
    menutitle: "DEPERMENTAL MENU",
    Items: [
      {
        path: `${process.env.PUBLIC_URL}/DepartmentalDashboard`,
        icon: "home",
        type: "link",
        active: true,
        title: "Dashboard",
        view: ""
      },
     

      
      
    ],
  },


];


export const AdminMENUITEMS = [
  
  {
    menutitle: "DEPERMENTAL MENU",
    Items: [
      {
        path: `${process.env.PUBLIC_URL}/DepartmentalDashboard`,
        icon: "home",
        type: "link",
        active: true,
        title: "Dashboard",
        view: ""
      },
      {
        path: `${process.env.PUBLIC_URL}/NewProduct`,
        icon: "grid",
        type: "link",
        active: false,
        title: "Product Request",
      },
      
      {
        path: `${process.env.PUBLIC_URL}/Minutes`,
        icon: "grid",
        type: "link",
        active: false,
        title: "Minutes",
      },
      {
        path: `${process.env.PUBLIC_URL}/allApplication`,
        icon: "grid",
        type: "link",
        active: false,
        title: "All Application",
      },
      {
            title: "Admin",
            icon: "grid",
            type: "sub",
            active: false,
            children: [
              {
                path: `${process.env.PUBLIC_URL}/admin/periods`,
                type: "link",
                title: "Periods",
              },
              {
                path: `${process.env.PUBLIC_URL}/admin/addUser`,
                type: "link",
                title: "Users",
              },
        
              {
                path: `${process.env.PUBLIC_URL}/admin/Products`,
                type: "link",
                title: "Products",
              },
            ]
          }

      
      
    ],
  },


];

// [
//   {
//     path: `${process.env.PUBLIC_URL}/DepartmentalDashboard`,
//     icon: "home",
//     type: "link",
//     active: true,
//     title: "Dashboard",
//     view: ""
//   },
//   {
//     path: `${process.env.PUBLIC_URL}/NewProduct`,
//     icon: "grid",
//     type: "link",
//     active: false,
//     title: "Product Request",
//   },
  
//   {
//     path: `${process.env.PUBLIC_URL}/Minutes`,
//     icon: "grid",
//     type: "link",
//     active: false,
//     title: "Minutes",
//   },
//   {
//     path: `${process.env.PUBLIC_URL}/allApplication`,
//     icon: "grid",
//     type: "link",
//     active: false,
//     title: "All Application",
//   },

//   {
//     title: "Admin",
//     icon: "grid",
//     type: "sub",
//     active: false,
//     children: [
//       {
//         path: `${process.env.PUBLIC_URL}/admin/periods`,
//         type: "link",
//         title: "Periods",
//       },
//       {
//         path: `${process.env.PUBLIC_URL}/admin/addUser`,
//         type: "link",
//         title: "Users",
//       },

//       {
//         path: `${process.env.PUBLIC_URL}/admin/Products`,
//         type: "link",
//         title: "Products",
//       },
//     ]
//   }

// ];
