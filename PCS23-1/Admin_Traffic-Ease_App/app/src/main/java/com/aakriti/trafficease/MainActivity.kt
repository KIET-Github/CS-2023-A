package com.aakriti.trafficease

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.Toast

class MainActivity : AppCompatActivity(){
    lateinit var admin_id: EditText
    lateinit var  password_id: EditText
    lateinit var login_id: Button
    val validadmin_id="EasyTrafficAdmin"
    val validpassword="Admin@123"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        title ="Log In"

        admin_id=findViewById(R.id.admin_id)
        password_id=findViewById(R.id.password_id)
        login_id=findViewById(R.id.login_id)

        val admin=admin_id.text.toString()
        val pass =password_id.text.toString()

        login_id.setOnClickListener{
           val intent = Intent(this@MainActivity, report_activity::class.java)
            startActivity(intent)
            /*if(admin==validadmin_id && pass==validpassword)
            {
                val intent = Intent(this@MainActivity, report_activity::class.java)
                startActivity(intent)
            }
           else
            {
                Toast.makeText(this@MainActivity,"Wrong Credentials!", Toast.LENGTH_LONG).show()
            }*/

        }

    }


}