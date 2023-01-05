package com.aakriti.trafficease


import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide


class MyAdapter(private val userList : ArrayList<User> , private val context : Context): RecyclerView.Adapter<MyAdapter.MyViewHolder>() {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val itemView =LayoutInflater.from(parent.context).inflate(R.layout.user_item,parent,false)
        return MyViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val currentitem: User=userList[position]
       // holder.longitude.setText(userList.get(position).getName());
       holder.latitude.text= currentitem.Latitude.toString()
      holder.longitude.text= currentitem.Longitude.toString()

      // holder.photo.text  = currentitem.Photo

        Glide.with(context).load(currentitem.Photo).into(holder.photo)
    }

    override fun getItemCount(): Int {
        return userList.size
    }

    class MyViewHolder(itemView : View) : RecyclerView.ViewHolder(itemView)
    {
      val latitude: TextView=itemView.findViewById(R.id.latitude)
      val longitude : TextView=itemView.findViewById(R.id.longitude)
        val photo : ImageView=itemView.findViewById(R.id.user_photo)

    }
}