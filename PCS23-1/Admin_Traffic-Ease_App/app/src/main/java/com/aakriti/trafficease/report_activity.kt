package com.aakriti.trafficease

import android.content.ContentValues.TAG
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.database.*

class report_activity : AppCompatActivity() {
    private lateinit var dbref: DatabaseReference
    private lateinit var userRecyclerView : RecyclerView
    private lateinit var userArrayList : ArrayList<User>

    override fun onCreate(savedInstanceState: Bundle?) {
       // title ="Traffic Report"

        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_report2)

        userRecyclerView=findViewById(R.id.user_list)
        userRecyclerView.layoutManager=LinearLayoutManager(this)
        userRecyclerView.setHasFixedSize(true)
        userArrayList= arrayListOf<User>()
        getUserData()

    }
    private fun getUserData()
    {
        dbref= FirebaseDatabase.getInstance().getReference("Users")
        dbref.addValueEventListener(object: ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if(snapshot.exists())
                {
                    for(userSnapshot in snapshot.children)
                    {
                        val user =userSnapshot.getValue(User::class.java)
                        userArrayList.add(user!!)
                    }
                    userRecyclerView.adapter=MyAdapter(userArrayList , this@report_activity)
                }
            }

            override fun onCancelled(error: DatabaseError) {
                Log.w(TAG, "Failed to read value.", error.toException());
            }

        })
    }
}