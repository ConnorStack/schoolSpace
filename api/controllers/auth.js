import { db } from "../db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// export const register = (req, res) => {
//     //CHECK USER IF EXISTS
  
//     const q = "SELECT * FROM users WHERE username = ?";
  
//     db.query(q, [req.body.username], (err, data) => {
//       if (err) return res.status(500).json(err);
//       if (data.length) return res.status(409).json("User already exists!");
//       //CREATE A NEW USER
//       //Hash the password
//       const salt = bcrypt.genSaltSync(10);
//       const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  
//       const q =
//         "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";
  
//       const values = [
//         req.body.username,
//         req.body.email,
//         hashedPassword,
//         req.body.name,
//       ];
  
//       db.query(q, [values], (err, data) => {
//         if (err) return res.status(500).json(err);
//         return res.status(200).json("User has been created.");
//       });
//     });
//   };
export const registerUser = (req, res)=>{}



  export const register = (req, res)=>{
    const q = "SELECT * FROM user WHERE email = ? OR username = ?"
    db.query(q,[req.body.email, req.body.username], (err, data)=>{
        if(err) return res.json
        if(data.length) return res.status(409).json("user already exists")

        //hashy the pass
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.pw, salt);

        const q = "INSERT INTO user(`fname`,`lname`,`username`, `pw`,`email`, `address`, `phone`) VALUES (?)"
        const values = [
            req.body.fname,
            req.body.lname,
            req.body.username,
            hash,
            req.body.email,
            req.body.address,
            req.body.phone
        ];

        db.query(q, [values], (err, data)=>{
            if (err) return res.json(err);
            return res.status(200).json("USER CREATED")
        })
    })

}


export const login = (req, res) => {
  const q = "SELECT * FROM user WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.pw,
      data[0].pw
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
    res.clearCookie("accessToken",{
      secure:true,
      sameSite:"none"
    }).status(200).json("User has been logged out.")
    
  };

  export const testget = (req, res) => {
    // res.json("in testget")
    const q = "SELECT * FROM register_user;"
    db.query(q, [req.query], (error, results) => {
        if (error) return res.send("error mon")
        return res.status(200).json(results)
    });
}